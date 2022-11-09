import { Grid } from "@mui/material";
import React from "react";
import { ProfileLayout, fetchAccount } from '../../../components/ProfileLayout';
import FollowerCard from "../../../components/FollowerCard/FollowerCard";
import axios from "../../../services/api";

export async function getServerSideProps(context) {
  const { username } = context.query
  const { data: followers } = await axios.get(`/users/${username}/followers`);
  const profile = await fetchAccount();
  return {
    props: {
      followers,
      profile,
    },
  };
}

export default function Page({ followers }) {
  const { results: followersList, pagination } = followers;
  return (
    <Grid container spacing={3.75}>
      {followersList?.map((follower) => {
        return (
          <Grid key={`card-followers-${follower.id}`} item lg={2}>
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
