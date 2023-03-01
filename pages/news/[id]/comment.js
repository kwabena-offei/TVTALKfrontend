import React, { useState } from "react";
import { isAuthenticated } from "../../../services/isAuth";
import useAxios from '../../../services/api';
import { NewsCommentLayout } from "../../../components/NewsCommentLayout";
import ReactionCard from "../../../components/ReactionCard";
import { Grid } from "@mui/material";
import useSocket from "../../../hooks/useSocket";

export async function getServerSideProps(context) {
  const { axios } = useAxios(context)
  const { id } = context.query;
  const { data: news } = await axios.get(`/news`);
  const isAuth = isAuthenticated(context)
  // Todo: this is temporary solution - replace it if you find another way to fetch data of a one news
  const [filteredNews] = news.filter((newsItem) => {
    const idString = newsItem.id.toString();
    if (idString === id) {
      return newsItem;
    }
  });
  const { data: comments } = await axios.get(`/comments?story_id=${id}`);
  const { data: profile } = isAuth ? await axios.get(`/profile`) : { data: { image: '', username: '' } }

  return {
    props: {
      news: filteredNews,
      comments,
      isAuth,
      profile,
    },
  };
}

export default function Page({ news, comments: serverComments, isAuth, profile }) {
  const [newsComments, setNewsComments] = useState(serverComments)

  const socket = useSocket(
    'story_comments',
    'CommentsChannel',
    { "story_id": news.id },
    (response) => {
      if(response.message?.type === 'comment') {
        setNewsComments((prevState) => {
          return {
            ...prevState,
            results: [ ...prevState.results, response.message ]};
        })
      }
  });
  
  return (
    <Grid container rowSpacing={{ xs: 2.5, md: 5 }}>
      { newsComments?.results?.length
        ? newsComments?.results?.map(comment => (
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
  return <NewsCommentLayout isAuth={page.props.isAuth}>{page}</NewsCommentLayout>
}