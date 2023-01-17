import React from "react";
import axios from "axios";
import { TV_TALK_API } from "../../../../../util/constants";
import { CommentLayout } from "../../../../../components/Chat/CommentLayout";
import LikeCard from "../../../../../components/Chat/LikeCard";
import Grid from "@mui/material/Unstable_Grid2";
import { EmptyDataFeedback } from "../../../../../components/Chat/EmptyDataFeedback";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { data: comment } = await axios.get(`${TV_TALK_API}/comments/${id}`)

  return {
    props: {
      comment
    }, // will be passed to the page component as props
  };
}

export default function Page({ comment }) {
  const { likes: likesList } = comment
  return (
    <>
      { likesList.length
        ? <Grid container spacing={2.5}>
            {likesList.map((like) => (
                <Grid xs={12} md={6} key={like.username}>
                  <LikeCard data={like} />
                </Grid>
            ))}
          </Grid>
        : <EmptyDataFeedback type={'likes'} />
      }
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <CommentLayout>{page}</CommentLayout>;
};
