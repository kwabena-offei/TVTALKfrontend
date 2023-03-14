import React from "react";
import { useTheme, useMediaQuery, Grid } from "@mui/material";
import { NewsMainContainer } from "../NewsCard/NewsCard.styled";
import MobileHeader from "../OneNewsPage/MobileHeader";
import { useRouter } from "next/router";
import NewsCard from "../NewsCard";
import { ButtonBack } from "../AccountSettingsLayout/AccountSettingsLayout.styled";
import { CommentNews } from "./CommentNews";
import { GridLayout } from "./NewsCommentLayout.styled";
import { AuthContext } from "../../util/AuthContext";

export const NewsCommentLayout = ({ children, isAuth }) => {
  const { news, profile } = children.props;
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AuthContext.Provider value={isAuth}>
      <>
        <NewsMainContainer
          maxWidth="xl"
          sx={
            isMobile
              ? { marginBottom: "20px", flexGrow: 1 }
              : { marginY: "60px", flexGrow: 1 }
          }
        >
          {isMobile ? (
            <>
              <MobileHeader source={"Comment"} />
              <Grid container marginBottom={3.75}>
                <Grid item sm />
                <Grid item maxWidth={555}>
                  <NewsCard {...news} commentMode />
                </Grid>
                <Grid item sm />
              </Grid>
            </>
          ) : (
            <Grid container marginBottom={5} columnSpacing={2}>
              <Grid item md>
                <ButtonBack onClick={() => router.back()} />
              </Grid>
              <Grid item maxWidth={1010} md={8}>
                <NewsCard {...news} commentMode />
              </Grid>
              <Grid item md />
            </Grid>
          )}
          <GridLayout
            containerProps={
              isMobile
                ? { marginBottom: "20px" }
                : { marginBottom: "60px", columnSpacing: 2 }
            }
            isMobile={isMobile}
            middleColProps={{
              md: 8,
              maxWidth: { xs: "555px", md: "1010px" },
              width: "100%",
            }}
          >
            {children}
          </GridLayout>
        </NewsMainContainer>
        <CommentNews profile={profile} isMobile={isMobile} story_id={news.id} />
      </>
    </AuthContext.Provider>
  );
};
