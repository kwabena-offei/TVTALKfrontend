import React from "react";
import {
  Box,
  Container,
  Stack,
  Tabs,
  Tab,
  Typography
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { TabLabel } from "./CommentLayout.styled";
import { useRouter } from "next/router";
import ReactionCard from "../../ReactionCard";
import { ButtonBack, ButtonBackMobile } from "../Chat.styled"
import Grid from "@mui/material/Unstable_Grid2";

export const CommentLayout = ({ children }) => {
  const { props } = children;
  const { comment } = props;
  const router = useRouter();
  const currentRoute = router.asPath;
  const { tmsId, id, replies, likes, shares } = props.comment;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

  const inheritURL = `/chat/${tmsId}/comments/${id}`;

  const tabs = [
    {
      title: "Likes",
      href:  `${inheritURL}/likes`,
      count: likes | "0",
    },
    {
      title: "Replies",
      href: `${inheritURL}/replies`,
      count: replies | "0",
    },
    {
      title: "Shares",
      href: `${inheritURL}/shares`,
      count: shares | "0",
    }
  ];

  const handleChangeTab = (event, tabId) => {
    router.push(tabId);
  };

  return (
    <>
      <Container maxWidth='xl' sx={{ marginTop: 8 }}>
        <Grid container>
          <Grid xs={12} md={2}>
            {isMobileOrTablet
            ? <Stack direction='row' spacing={3} alignItems='center' sx={{mb: '30px'}}>
                <ButtonBackMobile />
                <Typography fontSize={30} fontWeight={600}>{comment.user.username}'s Post</Typography>
              </Stack>
            : <ButtonBack />}
          </Grid>

          <Grid xs={12} md={8} sx={{ pb: { xs:'40px', md: '60px' } }}>
            <ReactionCard profile={comment.user} {...comment} commentsMode withoutActions/>
          </Grid>
          <Grid xs={0} md={2} />
        </Grid>
      </Container>
      <Container maxWidth='xl' disableGutters={isMobile}>
        <Grid container>
          <Grid xs={0} md={2}/>
          <Grid xs={12} md={8}>
            <Box sx={{
                marginY: isMobile ? 1.25 : 2.5
              }}>
                <Tabs
                  value={currentRoute}
                  onChange={handleChangeTab}
                  variant="fullWidth"
                  textColor='secondary'
                >
                  {tabs.map((value, key) => 
                    <Tab sx={{ padding: '1em 2em'}} key={key} value={value.href} label={<TabLabel {...value} isMobile={isMobile} />}></Tab>
                  )}
                </Tabs>
              </Box>
          </Grid>
          <Grid xs={0} md={2} />
        </Grid>
      </Container>
      <Container maxWidth='xl'>
        <Grid container>
          <Grid xs={0} md={2}/>
          <Grid xs={12} md={8}>
            {children}
          </Grid>
          <Grid xs={0} md={2} />
        </Grid>
      </Container>
    </>
  );
};