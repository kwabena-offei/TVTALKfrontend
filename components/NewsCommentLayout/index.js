import React from "react";
import { useTheme, useMediaQuery, Grid, Box } from "@mui/material";
import { NewsMainContainer } from "../NewsCard/NewsCard.styled";
import MobileHeader from "../OneNewsPage/MobileHeader";
import { useRouter } from "next/router";
import NewsCard from "../NewsCard";
import { ButtonBack } from "../AccountSettingsLayout/AccountSettingsLayout.styled";
import { CommentNews } from "./CommentNews";

export const NewsCommentLayout = ({ children }) => {
  const { news } = children.props
  const router = useRouter()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // ToDo: replace with auth value
  const profile = { image: '', username: '' }

  if (isMobile) {
    return (
      <>
        <NewsMainContainer sx={{ marginBottom: '20px', flexGrow: 1 }}>
          <MobileHeader source={'Comment'} />
          <Grid container>
            <Grid item sm />
            <Grid item maxWidth={555}>
              <NewsCard {...news} commentMode/>
              {children}
            </Grid>
            <Grid item sm />
          </Grid>
        </NewsMainContainer>
        <CommentNews profile={profile} isMobile story_id={news.id}/>
      </>
    );
  }

  return (
    <>
      <NewsMainContainer maxWidth="xl" sx={{ marginY: '60px', flexGrow: 1 }}>
        <Grid container sx={{ marginBottom: "60px" }} spacing={2}>
          <Grid item md>
            <ButtonBack onClick={() => router.back()} />
          </Grid>
          <Grid item maxWidth={1010} md={8}>
            <NewsCard {...news} commentMode />
            {children}
          </Grid>
          <Grid item md />
        </Grid>
      </NewsMainContainer>
      <CommentNews profile={profile} isMobile={false} story_id={news.id}/>
    </>
  );
}