import React, { useState, useContext, useEffect } from "react";
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
import useAxios from "../../services/api";
import { AuthContext } from "../../util/AuthContext";

const { axios } = useAxios();
export async function fetchAccount(username) {
  const { data: profile } = await axios.get(`/users/${username}`);
  return profile;
}

export const UserLayout = ({ children, mode }) => {
  const { props } = children;
  const { profile } = props;
  const { profile: currentUser } = useContext(AuthContext);

  const router = useRouter();
  const currentRoute = router.asPath;

  console.log("--- DEBUGGING FOLLOW BUTTON ---");
  console.log("Profile being viewed:", profile);
  console.log("Currently logged-in user:", currentUser);

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

  const [isFollowing, setIsFollowing] = useState(is_following);
  const [followersCount, setFollowersCount] = useState(followers_count);

  useEffect(() => {
    setFollowersCount(followers_count);
    setIsFollowing(is_following);
  }, [followers_count, is_following]);


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const inheritURL = mode === "profile" ? "/profile" : `/users/${username}`;

  const tabs = [
    {
      title: "Reactions",
      href: `${inheritURL}/reactions`,
      count: reactions_count || "0",
    },
    {
      title: "Favorites",
      href: `${inheritURL}/favorites`,
      count: favorites_count || "0",
    },
    {
      title: "Followers",
      href: `${inheritURL}/followers`,
      count: followersCount || "0",
    },
    {
      title: "Following",
      href: `${inheritURL}/following`,
      count: following_count || "0",
    },
  ];

  const handleChangeTab = (event, tabId) => {
    router.push(tabId);
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.delete(`/relationships/${id}`);
        setIsFollowing(false);
        setFollowersCount((prev) => prev - 1);
      } else {
        await axios.post(`/relationships`, {
          followed_id: id,
        });
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
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

            {currentUser && currentUser.id && currentUser.id !== id && (
              <FollowButton
                isMobile={isMobile}
                onClick={handleFollow}
                isFollowing={isFollowing}
              >
                {isFollowing ? "Unfollow" : "Follow"}
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
