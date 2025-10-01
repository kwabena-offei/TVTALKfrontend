import React, { useState } from "react";
import { Container, Box, Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ChatHeaderImage,
  ButtonBackMobile,
  ButtonBack,
  DESCTOP_BUTTON_WIDTH,
  MOBILE_BUTTON_WIDTH,
} from "./Chat.styled";
import { MenuSelects } from "./MenuSelects";
import MainContent from "./MainContent";
import { useRouter } from "next/router";
import NewPostCard from "./NewPostCard";

export const ChatHeader = ({ show, heroImage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const handleGoBack = () => router.back();
  return (
    <ChatHeaderImage image={heroImage}>
      <Container maxWidth="xl" sx={{ height: "inherit" }}>
        <Stack
          direction="row"
          sx={{ my: isMobile ? 2 : 5, width: "100%", height: "inherit" }}
        >
          {isMobile ? (
            <ButtonBackMobile onClick={handleGoBack} />
          ) : (
            <ButtonBack onClick={handleGoBack} />
          )}
          <Box
            sx={{
              width: "100%",
              padding: 0,
              paddingRight: isMobile
                ? `${MOBILE_BUTTON_WIDTH}px`
                : `${DESCTOP_BUTTON_WIDTH}px`,
              justifySelf: "center",
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            {isMobile ? (
              <Typography fontSize={48} fontWeight={700}>
                {show.title}
              </Typography>
            ) : (
              <Typography fontSize={64} fontWeight={700}>
                {show.title}
              </Typography>
            )}
          </Box>
        </Stack>
      </Container>
    </ChatHeaderImage>
  );
};

export const ChatContent = ({
  comments,
  profile,
  show,
  onEpisodeSelect,
  onSortChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isNotLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const router = useRouter();
  const { tmsId, reactionId } = router.query;

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={2.5}
        alignItems={isMobile ? "flex-start" : "stretch"}
      >
        <Grid xs={12} md={3} lg={2.5}>
          <MenuSelects
            tmsId={show.tmsId}
            seriesId={show.seriesId}
            episodes={show.totalEpisodes}
            seasons={show.totalSeasons}
            onEpisodeSelect={onEpisodeSelect}
            onSortChange={onSortChange}
          />
        </Grid>
        <Grid xs={12} md={9} lg={7}>
          <NewPostCard isMobile={isMobile} profile={profile} show_id={tmsId} />
        </Grid>
        <Grid lg={2.5} sx={isNotLarge ? { display: "none" } : {}} />
      </Grid>
      <Grid container sx={{ mt: isMobile ? 2.5 : 5 }} columnSpacing={2.5}>
        <Grid md={3} lg={2.5} />
        <Grid xs={12} md={9} lg={7}>
          <MainContent comments={comments} focusCommentId={reactionId} />
        </Grid>
        <Grid lg={2.5} />
      </Grid>
    </Container>
  );
};
