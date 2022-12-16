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

export const ChatContent = ({show, comments}) => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return(
    <Container>
      <Grid container columnSpacing={3.5}>
        <Grid item xs={12} md={3}>
          <MenuSelects />
        </Grid>
        <Grid item xs={12} md={6}>
          <MainContent />
        </Grid>
        <Grid item xs={0} md={3} />
      </Grid>
    </Container>
  )
}