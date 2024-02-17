import React from "react";
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

const { axios } = useAxios();
export async function fetchAccount(username) {
  const { data: profile } = await axios.get(`/users/${username}`);
  return profile;
}

export const UserLayout = ({ children, mode }) => {
  const { props } = children;
  const { profile } = props;

  const router = useRouter();
  const currentRoute = router.asPath;

  const {
    username,
    image,
    reactions_count,
    favorites_count,
    followers_count,
    following_count,
  } = profile;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const inheritURL = mode === "profile" ? "/profile" : `/users/${username}`;

  const tabs = [
    {
      title: "Reactions",
      href: `${inheritURL}/reactions`,
      count: reactions_count | "0",
    },
    {
      title: "Favorites",
      href: `${inheritURL}/favorites`,
      count: favorites_count | "0",
    },
    {
      title: "Followers",
      href: `${inheritURL}/followers`,
      count: followers_count | "0",
    },
    {
      title: "Following",
      href: `${inheritURL}/following`,
      count: following_count | "0",
    },
  ];

  const handleChangeTab = (event, tabId) => {
    router.push(tabId);
  };

  const handleFollow = async () => {
    const res = await axios.post(`/relationships`, {
      follower_id: 653,
      followed_id: 485,
    });
    console.log("res", res);
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

            <FollowButton isMobile={isMobile} onClick={handleFollow} />
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
