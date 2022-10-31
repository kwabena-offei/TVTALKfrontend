import { useState } from "react";
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
import React from "react";
import { styled } from "@mui/system";
// import { NavTabs } from '../../components/NavTabs'

export async function getServerSideProps(context) {
  const username = "funkparliament";
  let res = await fetch(`https://api.tvtalk.app/users/${username}`);
  let profile = await res.json();
  console.log('context', context);
  return {
    props: {
      profile: profile,
    }, // will be passed to the page component as props
  };
}

const StyledBGBox = styled(Box, {
  name: "gradient",
  slot: "bg",
})({
  width: "100%",
  height: "18.5vh",
  background: `linear-gradient(89.18deg, #0B228D 0%, #6184FF 129.11%)`,
});
const StyledContainer = styled (Container, {
  name: "WrapperTabs",
  slot: "account"
})({
  marginBottom: '4vh',
  paddingLeft: '0px!important',
  paddingRight: '0px!important'
})
const profile = ({ profile }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);

  };
  // console.log("profile", profile);
  const { username, image, reactions_count, favorites_count, followers_count, following_count } = profile;
  const tabs = [
    {
      id: 0,
      title: 'Reactions',
      count: reactions_count | '0'
    },
    {
      id: 1,
      title: 'Favorites',
      count: favorites_count | '0'
    },
    {
      id: 2,
      title: 'Followers',
      count: followers_count | '0'
    },
    {
      id: 3,
      title: 'Following',
      count: following_count | '0'
    }
  ]
  return (
    <>
      <div style={{ height: "9.2vh" }}>Header imitation</div>
      <StyledBGBox />
      <StyledContainer maxWidth='xl'>
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
            <Typography variant="h3" sx={{ fontWeight: 700 }} margin={0}>
              {username}
            </Typography>
            <Button variant="contained" color="primary">
              Follow
            </Button>
          </Stack>
        </Stack>
      </StyledContainer>
      <StyledContainer maxWidth='xl'>
        <Box sx={{ width: '100%' }}>
          <Tabs
            variant="fullWidth"
            onChange={handleChangeTab}
            value={currentTab}
            aria-label="Tabs where selection follows focus"
            selectionFollowsFocus
          >{tabs.map((child) => {
            const { id, count, title } = child
            const label = <Stack flexDirection='row' alignItems='center' gap={1}><Typography variant="h4">{count}</Typography><Typography variant="h5">{title}</Typography></Stack>
              return <Tab key={`${id}-${title}`} label={label} />
            })}
          </Tabs>
        </Box>
      </StyledContainer>
      <StyledContainer maxWidth='xl'>
        'tab'
      </StyledContainer>
    </>
  );
};

export default profile;