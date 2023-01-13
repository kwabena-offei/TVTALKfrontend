import React from "react";
import axios from "axios";
import useAxios from '../../../../../services/api'
import { isAuthenticated } from '../../../../../services/isAuth'
import { TV_TALK_API } from "../../../../../util/constants";
import CommentCard from '../../../../../components/Chat/CommentCard'
import { CommentLayout } from "../../../../../components/Chat/CommentLayout";
import { Box } from "@mui/material";

export async function getServerSideProps(context) {
  const { tmsId, id } = context.query;
  const { data: show } = await axios.get(`${TV_TALK_API}/shows/${tmsId}`);
  const { data: comment } = await axios.get(`${TV_TALK_API}/comments/${id}`)
  const { data: subComments } = await axios.get(
    `${TV_TALK_API}/sub_comments?comment_id=${id}`
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
      subComments
    }, // will be passed to the page component as props
  };
}

export default function Page({ subComments }) {
  const { results: comments } = subComments;
  return (
    <>
      {comments.map((comment) => (
        <Box sx={{py: {xs: 1.25, md: 2.5}}} key={`${comment.tmsId}-${comment.id}`}>
          <CommentCard profile={comment.user} {...comment} commentType='SubComment'/>
        </Box>
      ))}
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <CommentLayout isAuth={page.props.isAuth} replay>{page}</CommentLayout>;
};
