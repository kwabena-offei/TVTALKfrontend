import { useTheme, useMediaQuery, Grid } from "@mui/material";
import React, { useState } from "react";
import { NewsMainContainer } from "../../../components/NewsCard/NewsCard.styled";
import MobileHeader from "../../../components/OneNewsPage/MobileHeader";
import { DesktopHeader } from "../../../components/NewsIFrameLayout/DesktopHeader";
import OneNewsCardDesktop from "../../../components/OneNewsPage/DesktopCard";
import OneNewsCardMobile from "../../../components/OneNewsPage/MobileCard";
import Share from "../../../components/Chat/Share";
import { useRouter } from "next/router";
import { TV_TALK_HOST, TV_TALK_HOST_LOCAL } from "../../../util/constants";
import getConfig from "next/config";
import { setLike } from "../../../services/like";
import useAxios from '../../../services/api';
import { isAuthenticated } from "../../../services/isAuth";
import { unAuthLikes } from "../../../util/constants";
import { AuthContext } from "../../../util/AuthContext";

export async function getServerSideProps(context) {
  const { axios } = useAxios(context)
  const isAuth = isAuthenticated(context)
  const { id } = context.query;
  const { data: news } = await axios.get(`/news`);
  const { data: likes } = isAuth ? await axios.get(`/likes`) : unAuthLikes

  // Todo: this is temporary solution - replace it if you find another way to fetch data of a one news
  const [filteredNews] = news.filter((newsItem) => {
    const idString = newsItem.id.toString();
    if (idString === id) {
      return newsItem;
    }
  });

  return {
    props: {
      news: {
        ...filteredNews,
        liked_by_auth_user: likes.stories.includes(filteredNews?.id)
      },
      isAuth
    },
  };
}

export default function Page({ news, isAuth }) {

  const { source, url, id, liked_by_auth_user } = news;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig();

  const parsedUrl = new URL(url)
  const shortenedHostUrl = parsedUrl.host.startsWith('www.') ? parsedUrl.host.substring(4) : parsedUrl.host
  const baseUrl = publicRuntimeConfig.API_ENV === 'development' ? TV_TALK_HOST_LOCAL : TV_TALK_HOST;

  const sharedLink = `${baseUrl}${router.asPath}`
  const [isLiked, setIsliked] = useState(liked_by_auth_user)
  const [shares, setShares] = useState(0)
  const [openShare, setOpenShare] = useState(false);
  const toggleShare = () => setOpenShare(!openShare);

  const liked = () => {
    setIsliked(true)
  }
  const unliked = () => {
    setIsliked(false)
  }

  const onComment = () => {
    return router.push({
      pathname: `${router.pathname}/comment`,
      query: router.query
    })
  }
  const onLike = async () => {
    try {
      const response = await setLike({ type: 'storyId', id, isLiked: !isLiked })
      const isLikedSuccess = response.data.stories.includes(id)
      isLikedSuccess ? liked() : unliked()
    } catch (error) {
      console.log('onLike story error', error)
    }
  }
  const onShare = () => {
    toggleShare()
  }

  if (isMobile) {
    return (
      <AuthContext.Provider value={isAuth}>
      <NewsMainContainer>
        <MobileHeader source={source} />
        <OneNewsCardMobile
          {...news}
          parsedUrl={parsedUrl}
          shortenedHostUrl={shortenedHostUrl}
          onComment={onComment}
          onLike={onLike}
          isLiked={isLiked}
          onShare={onShare}
        />
        <Share
          setShares={setShares}
          open={openShare}
          onClose={toggleShare}
          url={sharedLink}
          isMobile={isMobile}
          id={id}
          type={'story'}
        />
      </NewsMainContainer>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={isAuth}>
    <NewsMainContainer maxWidth="xl">
      <DesktopHeader
        source={source}
        url={parsedUrl}
        onComment={onComment}
        onLike={onLike}
        isLiked={isLiked}
        onShare={onShare}
      />
      <Grid container sx={{ marginBottom: "60px" }}>
        <Grid item sm />
        <Grid item maxWidth={1010}>
          <OneNewsCardDesktop {...news} parsedUrl={parsedUrl} shortenedHostUrl={shortenedHostUrl} />
        </Grid>
        <Grid item sm />
      </Grid>
      <Share
        setShares={setShares}
        open={openShare}
        onClose={toggleShare}
        url={sharedLink}
        isMobile={isMobile}
        id={id}
        type={'story'}
      />
    </NewsMainContainer>
    </AuthContext.Provider>
  );
}
