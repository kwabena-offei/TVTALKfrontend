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
import DarkButton from '../components/FavoriteCard/DarkRoundedTextButton'

export async function fetchAccount(context) {
  const testusername = "funkparliament";
  let res = await fetch(`https://api.tvtalk.app/users/${testusername}`);

  // let res = await fetch(`https://api.tvtalk.app/profile`);
  let account = await res.json();
  return account;
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
export const AccountLayout = ({ children }) => {
  // console.log('layout props', children)
  const { props } = children
  const [currentTab, setCurrentTab] = useState(0);
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
            <Typography variant='h3' sx={{ fontWeight: 700 }} margin={0}>
              {username}
            </Typography>
            <DarkButton variant="outlined">
              Edit Profile
            </DarkButton>
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
