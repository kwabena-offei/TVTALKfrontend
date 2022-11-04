import { Grid, Container } from "@mui/material";
import React from "react";
import { ProfileLayout, fetchProfile } from "../../components/ProfileLayout";
import { TV_TALK_API } from '../../util/constants';
import FollowerCard from "../../components/FollowerCard/FollowerCard";
import mockData from "../../util/MockData/followers_mock";

export async function getServerSideProps(context) {
  // ToDo: replace username with context value
  const username = "funkparliament";
  let res = await fetch(`${TV_TALK_API}/users/${username}/following`);
  console.log(res);

  let following = await res.json();
  const profile = await fetchProfile();
  console.log(following);
  return {
    props: {
      following,
      profile,
    },
  };
}

export default function Page(data) {
  const { following } = data;
  console.log("api-data following", following);
  // const { results } = following
  const { results } = mockData;
  return (
    // <Container maxWidth="xl" sx={{ marginTop: "2vh", paddingX: '2px!important' }}>
    <Grid container spacing={3.75}>
      {results?.map((follower) => {
        return (
          <Grid key={`card-following-${follower.id}`} item lg={2}>
            <FollowerCard {...follower} />
          </Grid>
        );
      })}
    </Grid>
    // </Container>
  );
}

Page.getLayout = function getLayout(page) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
