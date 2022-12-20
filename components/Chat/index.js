import React from "react";
import { Container, Box, Typography, Stack, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ChatHeaderImage,
  ButtonBackMobile,
  ButtonBack,
  DESCTOP_BUTTON_WIDTH,
  MOBILE_BUTTON_WIDTH
} from "./Chat.styled";
import { MenuSelects } from './MenuSelects';
import { MainContent } from './MainContent';
import { useRouter } from "next/router";
import NewPostCard from "./NewPostCard";

export const ChatHeader = ({ show }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter()
  const handleGoBack = () => router.back()
  return (
    <ChatHeaderImage image={show.preferred_image_uri}>
      <Container sx={{ height: 'inherit' }}>
        <Stack direction="row" sx={{ my: isMobile ? 2 : 5, width: '100%', height: 'inherit' }}>
          { isMobile 
            ? <ButtonBackMobile onClick={handleGoBack} />
            : <ButtonBack onClick={handleGoBack} />
          }
          <Box
            sx={{
              width: "100%",
              padding: 0,
              paddingRight: isMobile ? `${MOBILE_BUTTON_WIDTH}px` : `${DESCTOP_BUTTON_WIDTH}px`,
              justifySelf: 'center',
              alignSelf: 'center',
              textAlign: 'center'
            }}
          >
            { isMobile
              ? <Typography fontSize={48} fontWeight={700}>
                  {show.title}
                </Typography>
              : <Typography fontSize={64} fontWeight={700}>
                  {show.title}
                </Typography>
            }
          </Box>
        </Stack>  
      </Container>
    </ChatHeaderImage>
  )
}

export const ChatContent = ({show, comments, profile}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'))

  // const layout = {
  //   display: 'flex',
  //   flexDirection: isMobile ? 'column' : 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'stretch',
  //   marginBottom: isMobile ? 2.5 : 5
  // }
  // const desktopContentStart = {
  //   flexBasis: isMobile ? 170 : 231,
  //   flexGrow: 0,
  //   flexShrink: 0
  // }
  // const contentEnd = {
  //   flexBasis: (isMobile || isMd) ? 0 : 231,
  //   flexGrow: 0,
  //   flexShrink: 1
  // }
  // const contentMiddle = {
  //   flexGrow: 1,
  //   flexShrink: 0
  // }
  return(
    <Container>
      <Grid container alignItems={isMobile ? 'flex-start' : 'stretch'} gap={2.75}>
        <Grid item xs={12} md={3} lg={2.5}>
          <MenuSelects />  
        </Grid>
        <Grid item xs={12} md={8.5} lg={7}>
          <NewPostCard isMobile={isMobile} {...profile}/>
        </Grid>
        <Grid item xs={0} lg={2.5}/>
      </Grid>
      <Grid container gap={2.75} mt={2.75}>
        <Grid item xs={12} md={3} lg={2.5} />
        <Grid item xs={12} md={8.5} lg={7}>
          <MainContent />
        </Grid>
        <Grid item xs={0} lg={2.5} />
      </Grid>
      {/* <Box
        sx={layout}
      >
        <Box sx={isMobile ? { ...desktopContentStart, marginBottom: 2.5 } : desktopContentStart}>
          <MenuSelects />  
        </Box>
        <Container
          sx={{flexBasis: isMobile ? 135 : 231, ...contentMiddle}}
          disableGutters={isMobile}
        >
          <NewPostCard isMobile={isMobile} {...profile}/>
        </Container>
        <Box sx={contentEnd}/>
      </Box>
      <Box
        sx={layout}
      >
        <Box
        sx={isMobile ? { flexGrow: 0 } : desktopContentStart}
        />
        <Container sx={{ flexBasis: isMobile ? 135 : 231, ...contentMiddle }} disableGutters={isMobile}>
          <MainContent />
        </Container>
        <Box sx={isMobile ? { flexGrow: 0 } : contentEnd}/>
      </Box> */}
    </Container>
  )
}