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
      comment,
      route: 'shares'
    }, // will be passed to the page component as props
  };
}

export default function Page({ comment }) {
  const { shares: sharesList } = comment;
  return (
    <>
      { sharesList.length
        ? <Grid container spacing={2.5}>
            {sharesList.map((share) => (
              <Grid xs={12} md={6} key={share.username}>
                <LikeCard data={share} />
              </Grid>
            ))}
          </Grid>
        : <EmptyDataFeedback type={'shares'} text={'No one had share this yet.'} />
      }
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <CommentLayout>{page}</CommentLayout>;
};
