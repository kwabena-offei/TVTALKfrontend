'use client';

import React, { useState } from "react";
import useAxios from '../../../../../services/api'
import { isAuthenticated } from '../../../../../services/isAuth'
import CommentCard from '../../../../../components/Chat/CommentCard'
import { CommentLayout } from "../../../../../components/Chat/CommentLayout";
import { Box } from "@mui/material";
import { EmptyDataFeedback } from "../../../../../components/Chat/EmptyDataFeedback";
import useSocket from '../../../../../hooks/useSocket';

export async function getServerSideProps(context) {
  const { axios } = useAxios(context);
  const { tmsId, id, type } = context.query;
  const comment_type = type === 'SubComment' ? 'sub_' : ''
  const { data: show } = await axios.get(`/shows/${tmsId}`);
  const { data: comment } = await axios.get(`/${comment_type}comments/${id}`)
  const { data: subComments } = await axios.get(
    `/sub_comments?${comment_type}comment_id=${id}`
  );

  // -- If User is not authorized profile data will return null and isAuth will be false --
  const isAuth = isAuthenticated(context)
  const { data: profile } = isAuth ? await axios.get('/profile') : { data: null }

  return {
    props: {
      profile,
      isAuth,
      show,
      comment,
      subComments,
      route: 'replies'
    }, // will be passed to the page component as props
  };
}

export default function Page({ subComments: serverSubComments, comment }) {
  const [subComments, setSubComments] = useState(serverSubComments)

  const socket = useSocket(
    'comments',
    'CommentsChannel',
    { "comment_id": comment.id },
    (response) => {
      if(response.message?.type === 'sub_comment') {
        setSubComments((prevState) => {
          return {
            ...prevState,
            results: [ ...prevState.results, response.message ]};
        })
      }
  });

  return (
    <>
      { subComments?.results?.length
        ? subComments?.results?.map((comment) => (
            <Box sx={{py: {xs: 1.25, md: 2.5}}} key={`${comment.tmsId}-${comment.id}`}>
              <CommentCard profile={comment.user} tmsId={comment.tmsId} {...comment} header={false} commentType='SubComment'/>
            </Box>
          ))
        : <EmptyDataFeedback type={'replies'}/>
      }
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <CommentLayout isAuth={page.props.isAuth} reply>{page}</CommentLayout>;
};
