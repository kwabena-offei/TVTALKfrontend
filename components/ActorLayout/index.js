import React from "react";
import useSWR from "swr";

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

import axios from "axios";

const fetcher = (url) => fetch(url).then((res) => res.json());

export async function fetchActor(actorId) {
  return axios.get(`/api/actors/${actorId}`, fetcher);
}

export const ActorLayout = ({ children, mode }) => {
  const { props } = children;
  const { actorId } = props;

  const { data, isLoading } = useSWR(`/api/actors/${actorId}`, fetcher);

  console.log("data", data);
  console.log("isLoading", isLoading);

  const router = useRouter();
  const currentRoute = router.asPath;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const inheritURL = mode === "profile" ? "/profile" : `/actor/${actorId}`;

  const tabs = [
    {
      title: "Galerry",
      href: `${inheritURL}/gallery`,
    },
    {
      title: "TV Shows",
      href: `${inheritURL}/tv-shows`,
    },
    {
      title: "Movies",
      href: `${inheritURL}/movies`,
    },
    {
      title: "Awards",
      href: `${inheritURL}/awards`,
    },
  ];

  const handleChangeTab = (event, tabId) => {
    router.push(tabId);
  };

  const username = "actor";
  const image = null;

  return (
    <>
      {isMobile ? <ProfileTopBarMobile /> : <ProfileTopBar />}
      <Container>
        {/* <Box>
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

            {/* <FollowButton isMobile={isMobile} onClick={handleFollow} /> */}
        {/* </Stack> */}
        {/* </Box> */}
        <Box
          sx={{
            marginTop: "4vh",
          }}
        >
          {/* <Tabs
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
          </Tabs> */}
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
