import { Container, Grid } from '@mui/material';
import React from 'react';
import { ProfileLayout, fetchAccount } from '../../../components/ProfileLayout';
import ReactionCard from '../../../components/ReactionCard';
import useAxios from '../../../services/api';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

export async function getServerSideProps(context) {
  const { axios } = useAxios(context);
  const { username } = context.query
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { results: reactionsList, pagination } = reactions;
  return (
    <>
      <Grid container spacing={isMobile ? 2.5 : 3.5}>
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
