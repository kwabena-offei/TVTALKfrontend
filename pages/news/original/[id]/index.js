import React from "react";
import { IFrameComponent } from "../../../../components/IFrameComponent";
import { NewsIFrameLayout } from "../../../../components/NewsIFrameLayout";
import { NewsMainContainer } from "../../../../components/NewsCard/NewsCard.styled";
import axios from "axios";
import { TV_TALK_API } from "../../../../util/constants";

export async function getServerSideProps(context) {
  // console.log('context', context)
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
    }, // will be passed to the page component as props
  };
}

export default function Page({ news }) {
  const { url, source } = news;
  return (
    <>
      <NewsMainContainer maxWidth="xl">
        <NewsIFrameLayout source={source} url={url} />
      </NewsMainContainer>
      <IFrameComponent url={url} />
    </>
  );
}
