import { Grid, Container } from "@mui/material";
import React from "react";
import { ProfileLayout, fetchProfile } from "../../components/ProfileLayout";
import { TV_TALK_API } from '../../util/constants';
import FollowerCard from "../../components/FollowerCard/FollowerCard";
import axios from '../../services/api';

export async function getServerSideProps(context) {
  const { data: following } = await axios.get(`/profile/following`);
  const profile = await fetchProfile();
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
  return <ProfileLayout mode='profile'>{page}</ProfileLayout>;
};
