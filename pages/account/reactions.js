import { Container, Grid } from '@mui/material';
import React from 'react';
import { AccountLayout, fetchAccount } from '../../components/AccountLayout';
import { TV_TALK_API } from '../../util/constants';
import { ReactionCard } from '../../components/ReactionCard';

export async function getServerSideProps(context) {
    // ToDo: replace username with authorized account
    const testUserName = "funkparliament";
    let res = await fetch(`${TV_TALK_API}/users/${testUserName}/reactions`);
    // let res = await fetch(`${TV_TALK_API}/profile/reactions`);
    let reactions = await res.json();
    const account = await fetchAccount()

    return {
      props: {
        reactions,
        account,
      }, 
    };
}

export default function Page(data) {
  const { reactions, account } = data;
  const { results } = reactions;
  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "2vh", paddingX: '2px!important' }}>
        <Grid container spacing={3.5}>
          {results.map((result) => {
            return (
              <Grid item key={result.id} xs={12} md={6}>
                <ReactionCard {...result} profile={account} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <AccountLayout>{page}</AccountLayout>;
};
