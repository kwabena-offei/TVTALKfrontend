import React from "react";
import axios from "axios";
import { TV_TALK_API } from "../../../../../util/constants";
import { CommentLayout } from "../../../../../components/Chat/CommentLayout";
import { Box } from "@mui/material";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { data: comment } = await axios.get(`${TV_TALK_API}/comments/${id}`)
  const { data: subComments } = await axios.get(
    `${TV_TALK_API}/sub_comments?comment_id=${id}`
  );

  return {
    props: {
      comment,
      subComments
    }, // will be passed to the page component as props
  };
}

export default function Page({ comment, subComments }) {
  console.log('comment', comment)
  console.log('subComments', subComments)
  return (
    <>
      <Box sx={{bgcolor: '#cacaca', width: 300, height: 250, color: 'pallete.primary'}}>Likes</Box>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <CommentLayout>{page}</CommentLayout>;
};
