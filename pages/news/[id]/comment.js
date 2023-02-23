import React from "react";
import axios from "axios";
import { TV_TALK_API } from "../../../util/constants";
import { isAuthenticated } from "../../../services/isAuth";
// import useAxios from '../services/api';
import { NewsCommentLayout } from "../../../components/NewsCommentLayout";
import { AuthContext } from "../../../util/AuthContext";

export async function getServerSideProps(context) {
  // const { axios } = useAxios(context)
  const { id } = context.query;
  const { data: news } = await axios.get(`${TV_TALK_API}/news`);
  const isAuth = isAuthenticated(context)
  // Todo: this is temporary solution - replace it if you find another way to fetch data of a one news
  const [filteredNews] = news.filter((newsItem) => {
    const idString = newsItem.id.toString();
    if (idString === id) {
      return newsItem;
    }
  });
  const { data: comments } = await axios.get(`${TV_TALK_API}/comments?story_id=${id}`);
  // const { data: profile } = isAuth ? await axios.get(`${TV_TALK_API}/profile`) : { data: null }
  console.log('comments', comments)
  return {
    props: {
      news: filteredNews,
      comments,
      isAuth,
      // profile,
    },
  };
}

export default function Page({ news, comments, isAuth }) {
  console.log('comments', comments)

  return (
    <>
      comments
    </>
  )
  
}

Page.getLayout = function getLayout(page) {
  return <AuthContext.Provider value={page.props.isAuth}>
    <NewsCommentLayout>{page}</NewsCommentLayout>
  </AuthContext.Provider>
}