import React, { useState } from "react";
import { IFrameComponent } from "../../../../components/IFrameComponent";
import { NewsIFrameLayout } from "../../../../components/NewsIFrameLayout";
import { NewsMainContainer } from "../../../../components/NewsCard/NewsCard.styled";
import axios from "axios";
import useAxios from "../../../../services/api";
import { TV_TALK_API, TV_TALK_HOST_LOCAL, TV_TALK_HOST } from "../../../../util/constants";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { setLike } from "../../../../services/like";
import { isAuthenticated } from "../../../../services/isAuth";
import { unAuthLikes } from "../../../../util/constants";

export async function getServerSideProps(context) {
  // console.log('context', context)
  const { id } = context.query;
  const { axios } = useAxios(context)
  const isAuth = isAuthenticated(context)
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
      }
    }, // will be passed to the page component as props
  };
}

export default function Page({ news }) {
  const { url, source, id, liked_by_auth_user } = news;
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
    // console.log('router', router)
    const cropedRoute = router.pathname.replace('/original', '')
    return router.push({
      pathname: `${cropedRoute}/comment`,
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

  return (
    <>
      <NewsMainContainer maxWidth="xl">
        <NewsIFrameLayout
          source={source}
          url={url}
          onComment={onComment}
          onLike={onLike}
          isLiked={isLiked}
          onShare={onShare}
        />
      </NewsMainContainer>
      <IFrameComponent url={url} />
    </>
  );
}
