import { useTheme, useMediaQuery, Grid } from "@mui/material";
import React from "react";
import axios from "axios";
import { TV_TALK_API } from "../../../util/constants";
import { NewsMainContainer } from "../../../components/NewsCard/NewsCard.styled";
import MobileHeader from "../../../components/OneNewsPage/MobileHeader";
import { DesktopHeader } from "../../../components/NewsIFrameLayout/DesktopHeader";
import OneNewsCardDesktop from "../../../components/OneNewsPage/DesktopCard";
import OneNewsCardMobile from "../../../components/OneNewsPage/MobileCard";
import { useRouter } from "next/router";
// import useAxios from '../services/api';

export async function getServerSideProps(context) {
  // const { axios } = useAxios(context)
  const { id } = context.query;
  const { data: news } = await axios.get(`${TV_TALK_API}/news`);

  // Todo: this is temporary solution - replace it if you find another way to fetch data of a one news
  const [filteredNews] = news.filter((newsItem) => {
    const idString = newsItem.id.toString();
    if (idString === id) {
      return newsItem;
    }
  });

  return {
    props: {
      news: filteredNews,
    },
  };
}

export default function Page({ news }) {
  const { source, url } = news;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter()
  const parsedUrl = new URL(url)
  const shortenedHostUrl = parsedUrl.host.startsWith('www.') ? parsedUrl.host.substring(4) : parsedUrl.host

  console.log('router', router)
  const onComment = () => {
    return router.push({
      pathname: `${router.pathname}/comment`,
      query: router.query
    })
  }

  if (isMobile) {
    return (
      <NewsMainContainer>
        <MobileHeader source={source} />
        <OneNewsCardMobile {...news} parsedUrl={parsedUrl} shortenedHostUrl={shortenedHostUrl} onComment={onComment}/>
      </NewsMainContainer>
    );
  }

  return (
    <NewsMainContainer maxWidth="xl">
      <DesktopHeader source={source} url={parsedUrl} onComment={onComment}/>
      <Grid container sx={{ marginBottom: "60px" }}>
        <Grid item sm />
        <Grid item maxWidth={1010}>
          <OneNewsCardDesktop {...news} parsedUrl={parsedUrl} shortenedHostUrl={shortenedHostUrl} />
        </Grid>
        <Grid item sm />
      </Grid>
    </NewsMainContainer>
  );
}
