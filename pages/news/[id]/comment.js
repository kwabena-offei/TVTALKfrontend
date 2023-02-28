import React from "react";
import mainAxios from "axios";
import { TV_TALK_API } from "../../../util/constants";
import { isAuthenticated } from "../../../services/isAuth";
import useAxios from '../../../services/api';
import { NewsCommentLayout } from "../../../components/NewsCommentLayout";
import { AuthContext } from "../../../util/AuthContext";
import ReactionCard from "../../../components/ReactionCard";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

export async function getServerSideProps(context) {
  const { axios } = useAxios(context)
  const { id } = context.query;
  const { data: news } = await axios.get(`/news`);
  // const { data: news } = await mainAxios.get(`${TV_TALK_API}/news`);
  const isAuth = isAuthenticated(context)
  // Todo: this is temporary solution - replace it if you find another way to fetch data of a one news
  const [filteredNews] = news.filter((newsItem) => {
    const idString = newsItem.id.toString();
    if (idString === id) {
      return newsItem;
    }
  });
  // const { data: comments } = await mainAxios.get(`${TV_TALK_API}/comments?story_id=${id}`);
  const { data: comments } = await axios.get(`/comments?story_id=${id}`);
  const { data: profile } = isAuth ? await axios.get(`/profile`) : { data: { image: '', username: '' } }
  // console.log('comments', comments)
  return {
    props: {
      news: filteredNews,
      comments,
      isAuth,
      profile,
    },
  };
}

export default function Page({ news, comments, isAuth, profile }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { results: commentsList } = comments

  return (
    <Grid container rowSpacing={isMobile ? 2.5 : 5}>
      { commentsList.length
        ? commentsList.map(comment => (
          <Grid item xs={12} key={comment.id}>
            <ReactionCard {...comment} profile={comment.user} commentsMode commentType={'Story'} />
          </Grid>
        ))
        : null
      }
    </Grid>
  )
  
}

Page.getLayout = function getLayout(page) {
  return <AuthContext.Provider value={page.props.isAuth}>
    <NewsCommentLayout>{page}</NewsCommentLayout>
  </AuthContext.Provider>
}