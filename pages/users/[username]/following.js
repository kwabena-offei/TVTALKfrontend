import { Grid } from "@mui/material";
import React from "react";
import { ProfileLayout, fetchAccount } from '../../../components/ProfileLayout';
import FollowerCard from "../../../components/FollowerCard/FollowerCard";
import axios from '../../../services/api';

export async function getServerSideProps(context) {
  const { username } = context.query
  const { data: following } = await axios.get(`/users/${username}/following`);
  const profile = await fetchAccount(username);
  return {
    props: {
      following,
      profile,
    },
  };
}

export default function Page({ following }) {
  const { results: followingList, pagination } = following

  return (
    <Grid container spacing={3.75}>
      {followingList?.map((follower) => {
        return (
          <Grid key={`card-following-${follower.id}`} item lg={2}>
            <FollowerCard {...follower} />
          </Grid>
        );
      })}
    </Grid>
  );
}

Page.getLayout = function getLayout(page) {
  return <ProfileLayout mode='currentUser'>{page}</ProfileLayout>;
};
