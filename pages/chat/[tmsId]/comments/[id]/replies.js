import React from "react";
import axios from "axios";
import useAxios from '../../../../../services/api'
import { isAuthenticated } from '../../../../../services/isAuth'
import { TV_TALK_API } from "../../../../../util/constants";
import CommentCard from '../../../../../components/Chat/CommentCard'
import { CommentLayout } from "../../../../../components/Chat/CommentLayout";
import { Box } from "@mui/material";
import { EmptyDataFeedback } from "../../../../../components/Chat/EmptyDataFeedback";

export async function getServerSideProps(context) {
  const { tmsId, id, type } = context.query;
  const comment_type = type === 'SubComment' ? 'sub_' : ''
  console.log('context.query', context.query)
  const { data: show } = await axios.get(`${TV_TALK_API}/shows/${tmsId}`);
  const { data: comment } = await axios.get(`${TV_TALK_API}/${comment_type}comments/${id}`)
  const { data: subComments } = await axios.get(
    `${TV_TALK_API}/sub_comments?${comment_type}comment_id=${id}`
  );
  const { axios: myAxios } = useAxios(context);

  // -- If User is not authorized profile data will return null and isAuth will be false --
  const isAuth = isAuthenticated(context)
  const { data: profile } = isAuth ? await myAxios.get('/profile') : { data: null }

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

export default function Page({ subComments }) {
  const { results: sub_comments } = subComments;

  return (
    <>
      { sub_comments.length
        ? sub_comments.map((comment) => (
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
  return <CommentLayout isAuth={page.props.isAuth} replay>{page}</CommentLayout>;
};
