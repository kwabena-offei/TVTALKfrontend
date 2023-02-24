import React from "react";
import { useTheme, useMediaQuery, Grid, Box } from "@mui/material";
import { NewsMainContainer } from "../NewsCard/NewsCard.styled";
import MobileHeader from "../OneNewsPage/MobileHeader";
import { useRouter } from "next/router";
import NewsCard from "../NewsCard";
import { ButtonBack, BUTTON_WIDTH } from "../AccountSettingsLayout/AccountSettingsLayout.styled";
import { CommentNews } from "./CommentNews";
import { GridLayout } from "./NewsCommentLayout.styled";

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
          <Grid container marginBottom={3.75}>
            <Grid item sm />
            <Grid item maxWidth={555}>
              <NewsCard {...news} commentMode />
            </Grid>
            <Grid item sm />
          </Grid>
          <GridLayout containerProps={{ marginBottom: '20px' }} isMobile>
            {children}
          </GridLayout>
        </NewsMainContainer>
        <CommentNews profile={profile} isMobile story_id={news.id}/>
      </>
    );
  }

  return (
    <>
      <NewsMainContainer maxWidth="xl" sx={{ marginY: '60px', flexGrow: 1 }}>
        <Grid container marginBottom={5} columnSpacing={2}>
          <Grid item md>
            <ButtonBack onClick={() => router.back()} />
          </Grid>
          <Grid item maxWidth={1010} md={8}>
            <NewsCard {...news} commentMode />
          </Grid>
          <Grid item md />
        </Grid>
        <GridLayout containerProps={{ marginBottom: '60px', columnSpacing: 2 }} middleColProps={{ md: 8 }}>
          {children}
        </GridLayout>
      </NewsMainContainer>
      <CommentNews profile={profile} isMobile={false} story_id={news.id}/>
    </>
  );
}