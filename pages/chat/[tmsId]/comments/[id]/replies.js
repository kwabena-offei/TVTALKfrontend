import React from "react";
import axios from "axios";
import { TV_TALK_API } from "../../../../../util/constants";
import ReactionCard from "../../../../../components/ReactionCard";
import { Container } from "@mui/system";
import { ButtonBack } from "../../../../../components/Chat/Chat.styled";
import Grid from "@mui/material/Unstable_Grid2";
import { CommentLayout } from "../../../../../components/Chat/CommentLayout";
import { Box } from "@mui/material";

export async function getServerSideProps(context) {
  const { tmsId, id } = context.query;
  const { data: show } = await axios.get(`${TV_TALK_API}/shows/${tmsId}`);
  const { data: comment } = await axios.get(`${TV_TALK_API}/comments/${id}`)
  const { data: subComments } = await axios.get(
    `${TV_TALK_API}/sub_comments?comment_id=${id}`
  );

  return {
    props: {
      show,
      comment,
      subComments
    }, // will be passed to the page component as props
  };
}

export default function Page({ show, comment, subComments }) {
  console.log('comment', comment)
  return (
    <>
      <Box sx={{bgcolor: '#cacaca', width: 300, height: 250}} />
    {/* <Container maxWidth='xl' sx={{ marginTop: 8 }}>
      <Grid container columnSpacing={3}>
        <Grid xs={12} md={2}>
          <ButtonBack />
        </Grid>

        <Grid xs={12} md={8}>
            <ReactionCard profile={comment.user} {...comment} commentsMode withoutActions/> 
        </Grid>
        <Grid xs={0} md={2} />
      </Grid>
    </Container>
    <Container maxWidth='xl'>{children}</Container> */}
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <CommentLayout>{page}</CommentLayout>;
};
