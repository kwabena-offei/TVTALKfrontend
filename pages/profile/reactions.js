import { Container, Grid } from '@mui/material';
import React from 'react';
import { fetchProfile, ProfileLayout } from '../../components/ProfileLayout';
import { ReactionCard } from '../../components/ReactionCard';

export async function getServerSideProps(context) {
    console.log('context', context)
    const username = "funkparliament";
    let res = await fetch(`https://api.tvtalk.app/users/${username}/reactions`);
    // console.log(res);
    let reactions = await res.json();
    const profile = await fetchProfile()
    // console.log(reactions);
    return {
      props: {
        reactions,
        profile,
      }, // will be passed to the page component as props
    };
}

export default function Page(data) {
  const { reactions, profile } = data;
  const { results } = reactions;
  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "2vh", paddingX: '2px!important' }}>
        <Grid container spacing={3.5}>
          {results.map((result) => {
            return (
              <Grid item key={result.id} xs={12} md={6}>
                <ReactionCard {...result} profile={profile} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
