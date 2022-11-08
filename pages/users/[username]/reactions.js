import { Container, Grid } from '@mui/material';
import React from 'react';
import { ProfileLayout, fetchAccount } from '../../../components/ProfileLayout';
import ReactionCard from '../../../components/ReactionCard';
import axios from "../../../services/api";

export async function getServerSideProps(context) {
  console.log('[context. req]', context.req)
  const username = 'funkparliament'
  const { data: reactions } = await axios.get(`/users/${username}/reactions`);
  const profile = await fetchAccount(username);

  return {
    props: {
      reactions,
      profile,
    }, // will be passed to the page component as props
  };
}

export default function Page({ reactions, profile }) {
  const { results: reactionsList, pagination } = reactions;
  return (
    <>
      <Grid container spacing={3.5}>
        {reactionsList?.map((result) => {
          return (
            <Grid item key={result.id} xs={12} md={6}>
              <ReactionCard {...result} profile={profile} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <ProfileLayout mode='currentUser'>{page}</ProfileLayout>;
};
