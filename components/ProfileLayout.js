import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Avatar,
  Stack,
  Tabs,
  Tab
} from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
// import { NavTabs } from '../../components/NavTabs'

export async function fetchProfile(context) {
  const username = "funkparliament";
  let res = await fetch(`https://api.tvtalk.app/users/${username}`);
  let profile = await res.json();
  return profile;
}

const StyledBGBox = styled(Box, {
  name: "gradient",
  slot: "bg",
})({
  width: "100%",
  height: "18.5vh",
  background: `linear-gradient(89.18deg, #0B228D 0%, #6184FF 129.11%)`,
});
const StyledContainer = styled(Container, {
  name: "WrapperTabs",
  slot: "account"
})({
  marginBottom: '4vh',
  paddingLeft: '0px!important',
  paddingRight: '0px!important'
})
export const ProfileLayout = ({ children }) => {
  console.log('layout props', children)
  const { props } = children
  const [currentTab, setCurrentTab] = useState(0);
  const router = useRouter();
  const currentRoute = router.route;
  const { username, image, reactions_count, favorites_count, followers_count, following_count } = props.profile;
  
  const tabs = {
    0: {
      id: 0,
      title: "Reactions",
      href: "/profile/reactions",
      count: reactions_count | "0",
    },
    1: {
      id: 1,
      title: "Favorites",
      href: "/profile/favorites",
      count: favorites_count | "0",
    },
    2: {
      id: 2,
      title: "Followers",
      href: "/profile/followers",
      count: followers_count | "0",
    },
    3: {
      id: 3,
      title: "Following",
      href: "",
      count: following_count | "0",
    },
  };

  const handleChangeTab = (event, tabId) => {
    // setCurrentTab(newValue);
    console.log('handle')
  };

  return (
    <>
      <div style={{ height: "9.2vh" }}>Header imitation</div>
      <StyledBGBox />
      <StyledContainer maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
          spacing={4}
        >
          <Avatar
            alt={`${username}_avatar`}
            src={image}
            sx={{
              height: {
                lg: "250px",
                md: "150px",
                sm: "100px",
                xs: "60px",
              },
              width: {
                lg: "250px",
                md: "150px",
                sm: "100px",
                xs: "60px",
              },
              marginTop: {
                lg: "-125px",
                md: "-75px",
                sm: "-50px",
                xs: "-30px",
              },
              border: "10px solid #090F27",
            }}
          />
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-end"
            spacing={4}
            paddingBottom={5.53}
          >
            <Typography variant={{lg: 'h3', sm: '1rem'}} sx={{ fontWeight: 700 }} margin={0}>
              {username}
            </Typography>
            <Button variant="contained" color="primary">
              Follow
            </Button>
          </Stack>
        </Stack>
      </StyledContainer>
      <StyledContainer maxWidth="xl">
        <Box sx={{ width: "100%", justifyContent: 'center' }}>
          <Tabs
            variant="fullWidth"
            value={currentRoute}
            onChange={handleChangeTab}
            aria-label="Account tabs"
          >
            {Object.entries(tabs).map(([key, value]) => {
              const { id, count, title, href } = value;
              const label = (
                <Stack flexDirection="row" alignItems="center" gap={1}>
                  <Typography variant="h4">{count}</Typography>
                  <Typography variant="h5">{title}</Typography>
                </Stack>
              );
              return (
                <Link href={href} value={href} key={id}>
                  <Tab value={href} label={label} className="fullWidth-tab"/>
                </Link>
              );
            })}
          </Tabs>
        </Box>
      </StyledContainer>
      <StyledContainer maxWidth="xl">{children}</StyledContainer>
    </>
  );
};
