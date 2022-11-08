import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Avatar,
  Stack,
  Tabs,
  Tab,
  responsiveFontSizes,
} from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from '../services/api';
import AppBar from '../components/AppBar';
import DarkButton from '../components/FavoriteCard/DarkRoundedTextButton'

export async function fetchAccount(username) {
  const { data: profile } = await axios.get(`/users/${username}`);
  return profile;
}

const AccountTopBar = styled(Box, {
  name: "gradient",
  slot: "bg",
})({
  width: "100%",
  height: "18.5vh",
  background: `linear-gradient(89.18deg, #0B228D 0%, #6184FF 129.11%)`,
});

export const AccountLayout = ({ children }) => {
  const { props } = children
  // const [currentTab, setCurrentTab] = useState(0);
  const router = useRouter();
  const currentRoute = router.route;
  const { username, image, reactions_count, favorites_count, followers_count, following_count } = props.account;
  
  const tabs = {
    0: {
      id: 0,
      title: "Reactions",
      href: "/account/reactions",
      count: reactions_count | "0",
    },
    1: {
      id: 1,
      title: "Favorites",
      href: "/account/favorites",
      count: favorites_count | "0",
    },
    2: {
      id: 2,
      title: "Followers",
      href: "/account/followers",
      count: followers_count | "0",
    },
    3: {
      id: 3,
      title: "Following",
      href: "/account/following",
      count: following_count | "0",
    },
  };

  const handleChangeTab = (event, tabId) => {
    router.push(tabId)
  };

  return (
    <>
      <AppBar />
      <AccountTopBar />
      <Container>
        <Box>
          <Stack direction="row" alignItems="center">
            <Avatar alt="Remy Sharp" src={image} sx={{
              width: 180,
              height: 180,
              marginTop: '-90px',
              border: '8px solid #090F27'
            }} />
            <Typography sx={{
              margin: '20px',
              fontSize: '40px',
              fontWeight: 700
            }}>{username}</Typography>
            <Button aria-label="message" size="small"
              variant="contained"
              sx={{}}
              color="primary" >Follow</Button>
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
            {Object.entries(tabs).map(([key, value]) => {
              const { id, count, title, href } = value;
              const label = (
                <Stack direction="row" alignItems="center">
                  <Typography sx={{
                    fontSize: '28px',
                    fontWeight: '700',
                    marginRight: '20px'
                  }}>{count}</Typography>
                  <Typography sx={{
                    fontSize: '24px',
                    fontWeight: '500'
                  }}>{title}</Typography>
                </Stack>
              );
              return (
                <Tab value={href} label={label} />
              );
            })}
          </Tabs>
        </Box>
      </Container>
      <Container sx={{
        marginTop: '5vh'
      }}>
        {children}
      </Container>
    </>
  );
};
