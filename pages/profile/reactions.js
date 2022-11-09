import { Container, Grid } from '@mui/material';
import React from 'react';
import { fetchProfile, ProfileLayout } from '../../components/ProfileLayout';
import ReactionCard from '../../components/ReactionCard';
import axios from '../../services/api';

export async function getServerSideProps(context) {
  const { data: reactions } = await axios(`/profile/reactions`);
  const profile = await fetchProfile()
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
      <Grid container spacing={3.5}>
        {reactionsList?.map((result) => {
          return (
            <Grid item key={result.id} xs={12} md={6}>
              <ReactionCard {...result} profile={profile} />
            </Grid>
          );
        })}
      </Grid>
  );
}

Page.getLayout = function getLayout(page) {
  return <ProfileLayout mode='profile'>{page}</ProfileLayout>;
};