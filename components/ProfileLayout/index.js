import React from "react";
import {
  Box,
  Container,
  Stack,
  Tabs,
  Tab
} from "@mui/material";
import { ProfileTopBar, ProfileAvatar, ProfileUsername, TabLabel, FollowButton, EditProfileButton } from "./ProfileLayout.styled";
import { useRouter } from "next/router";
import axios from '../../services/api';

export async function fetchProfile(context) {
  const { data: profile } = await axios.get(`/profile`);
  return profile;
}

export async function fetchAccount(username) {
  const { data: profile } = await axios.get(`/users/${username}`);
  return profile;
}

export const ProfileLayout = ({ children, mode }) => {
  const { props } = children
  const router = useRouter();
  const currentRoute = router.asPath;
  const { username, image, reactions_count, favorites_count, followers_count, following_count } = props.profile;

  const inheritURL = mode === 'profile' ? "/profile" : `/users/${username}`;

  const tabs = [
    {
      title: "Reactions",
      href:  `${inheritURL}/reactions`,
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
      <ProfileTopBar />
      <Container>
        <Box>
          <Stack direction="row" alignItems="center">
            <ProfileAvatar alt={username} src={image} />
            <ProfileUsername>{username}</ProfileUsername>
            { mode === 'profile' ? <EditProfileButton /> : <FollowButton />}
          </Stack>
        </Box>
        <Box sx={{
          marginTop: '4vh'
        }}>
          <Tabs
            value={currentRoute}
            onChange={handleChangeTab}
            variant="fullWidth"
          >
            {tabs.map((value, key) => 
                <Tab key={key} value={value.href} label={<TabLabel {...value} />}></Tab>
            )}
          </Tabs>
        </Box>
      </Container>

      <Container sx={{
        marginTop: '5vh',
        minHeight: '80vh'
      }}>
        {children}
      </Container>
    </>
  );
};