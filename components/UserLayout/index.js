import React, { useContext } from "react";
import { Box, Container, Stack, Tabs, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ProfileTopBar,
  ProfileAvatar,
  ProfileUsername,
  TabLabel,
  FollowButton,
  ProfileTopBarMobile,
  ProfileAvatarMobile,
  ProfileUsernameMobile,
} from "./UserLayout.styled";
import { useRouter } from "next/router";
import { AuthContext } from "../../util/AuthContext";
import {
  useMutationUnfollow,
  useMutationFollow
} from "../../entities/user/hooks";

export async function fetchAccount(username, axiosInstance) {
  const { data: profile } = await axiosInstance.get(`/users/${username}`);
  return profile;
}

export const UserLayout = ({ children, mode }) => {
  const { props } = children;
  let { profile } = props;
  const { profile: currentUser } = useContext(AuthContext);


  if (mode === "profile") {
    profile = currentUser;
  }


  if (!profile?.id) {
    return null; 
  }

  const router = useRouter();
  const currentRoute = router.asPath;

  const {
    id,
    username,
    image,
    reactions_count,
    favorites_count,
    followers_count,
    following_count,
    is_following,
  } = profile;

  const unfollowMutation = useMutationUnfollow();
  const followMutation = useMutationFollow();
  const isLoading = unfollowMutation.isPending || followMutation.isPending;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const inheritURL = mode === "profile" ? "/profile" : `/users/${username}`;

  const tabs = [
    {
      title: "Reactions",
      href: `${inheritURL}/reactions`,
      count: reactions_count ?? 0,
    },
    {
      title: "Favorites",
      href: `${inheritURL}/favorites`,
      count: favorites_count ?? 0,
    },
    {
      title: "Followers",
      href: `${inheritURL}/followers`,
      count: followers_count ?? 0,
    },
    {
      title: "Following",
      href: `${inheritURL}/following`,
      count: following_count ?? 0,
    },
  ];

  const handleChangeTab = (event, tabId) => {
    router.push(tabId);
  };

  const handleFollow = async () => {
    if (isLoading) return;

    try {
      if (is_following) {
        await unfollowMutation.mutate(id);
      } else {
        await followMutation.mutate(id);
      }
    } catch (error) {
      console.error("Failed to update relationship", error);
    }
  };

  return (
    <>
      {isMobile ? <ProfileTopBarMobile /> : <ProfileTopBar />}
      <Container>
        <Box>
          <Stack direction={isMobile ? "column" : "row"} alignItems="center">
            {isMobile ? (
              <ProfileAvatarMobile alt={username} src={image} />
            ) : (
              <ProfileAvatar alt={username} src={image} />
            )}
            {isMobile ? (
              <ProfileUsernameMobile>{username}</ProfileUsernameMobile>
            ) : (
              <ProfileUsername>{username}</ProfileUsername>
            )}

            {currentUser?.id !== id && (
              <FollowButton
                isMobile={isMobile}
                onClick={handleFollow}
                isFollowing={is_following}
                disabled={isLoading}
              >
                {is_following ? "Unfollow" : "Follow"}
              </FollowButton>
            )}
          </Stack>
        </Box>
        <Box
          sx={{
            marginTop: "4vh",
          }}
        >
          <Tabs
            value={currentRoute}
            onChange={handleChangeTab}
            variant="fullWidth"
            textColor="secondary"
          >
            {tabs.map((value, key) => (
              <Tab
                key={key}
                value={value.href}
                label={<TabLabel {...value} isMobile={isMobile} />}
              ></Tab>
            ))}
          </Tabs>
        </Box>
      </Container>

      <Container
        sx={{
          marginTop: isMobile ? "3vh" : "5vh",
          marginBottom: isMobile ? "6vh" : "8vh",
        }}
      >
        {children}
      </Container>
    </>
  );
};
