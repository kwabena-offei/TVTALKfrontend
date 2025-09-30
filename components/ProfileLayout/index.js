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
  EditProfileButton,
  ProfileTopBarMobile,
  ProfileAvatarMobile,
  ProfileUsernameMobile,
} from "./ProfileLayout.styled";
import { useRouter } from "next/router";
import useAxios from "../../services/api";
import { AuthContext } from "../../util/AuthContext";

export async function fetchAccount(username, axiosInstance) {
  const { data: profile } = await axiosInstance.get(`/users/${username}`);
  return profile;
}

export const ProfileLayout = ({ children, mode }) => {
  const { profile, mutateProfile } = useContext(AuthContext);
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
            {mode === "profile" ? (
              <EditProfileButton isMobile={isMobile} />
            ) : (
              <FollowButton isMobile={isMobile} />
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
        {React.cloneElement(children, { mutateProfile })}
      </Container>
    </>
  );
};
