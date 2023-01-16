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
import { TabLabel, ReplayInputWrapper, ReplayDesktopInput, ReplayMobileInput } from "./CommentLayout.styled";
import { useRouter } from "next/router";
import ReactionCard from "../../ReactionCard";
import { ButtonBack, ButtonBackMobile } from "../Chat.styled"
import Grid from "@mui/material/Unstable_Grid2";
import { AuthContext } from "../../../util/AuthContext";

export const CommentLayout = ({ children, replay, isAuth }) => {
  const { props } = children;
  const { comment, profile } = props;
  const router = useRouter();
  const currentRoute = router.asPath;
  const { tmsId, id, sub_comments_count, likes_count, shares_count } = comment;
  console.log('comment', comment)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

  const inheritURL = `/chat/${tmsId}/comments/${id}`;

  const tabs = [
    {
      title: "Likes",
      href:  `${inheritURL}/likes`,
      count: likes_count | "0",
    },
    {
      title: "Replies",
      href: `${inheritURL}/replies`,
      count: sub_comments_count | "0",
    },
    {
      title: "Shares",
      href: `${inheritURL}/shares`,
      count: shares_count | "0",
    }
  ];

  const handleChangeTab = (event, tabId) => {
    router.push(tabId);
  };

  return (
    <AuthContext.Provider value={isAuth}>
      <Container maxWidth='xl' sx={{ marginTop: { xs: 1, md: 8 }, paddingX: 2.5 }}>
        <Grid container>
          <Grid xs={12} md={2}>
            {isMobileOrTablet
            ? <Stack direction='row' spacing={1.875} alignItems='center' sx={{mb: '30px'}}>
                <ButtonBackMobile />
                <Typography fontSize={24} fontWeight={600}>{comment?.user?.username}'s Post</Typography>
              </Stack>
            : <ButtonBack />}
          </Grid>

          <Grid xs={12} md={8} sx={{ pb: { xs:'40px', md: '60px' } }}>
            <ReactionCard profile={comment.user} {...comment} commentType='Comment' commentsMode withoutActions/>
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
      <Container maxWidth='xl' sx={{ mb: { xs: 5, md: 7.5 }, paddingX: 2.5 }}>
        <Grid container>
          <Grid xs={0} md={2}/>
          <Grid xs={12} md={8}>
            {children}
          </Grid>
          <Grid xs={0} md={2} />
        </Grid>
      </Container>
      {replay
        ? <ReplayInputWrapper isMobile={isMobile}>
            { isMobile 
              ? <ReplayMobileInput profile={profile} onPost={() => console.log('post')}/> 
              : <ReplayDesktopInput profile={profile} onPost={() => console.log('post')}/>
            }
          </ReplayInputWrapper>
        : null
      }
    </AuthContext.Provider>
  );
};