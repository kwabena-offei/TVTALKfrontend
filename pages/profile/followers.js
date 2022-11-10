import { Grid, Container } from "@mui/material";
import React from "react";
import { ProfileLayout, fetchProfile } from "../../components/ProfileLayout";
import FollowerCard from "../../components/FollowerCard/FollowerCard";
import axios from "../../services/api";

export async function getServerSideProps(context) {
  const { data: followers } = await axios.get(`/profile/followers`);
  const profile = await fetchProfile();
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
  return <ProfileLayout mode='profile'>{page}</ProfileLayout>;
};
