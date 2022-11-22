import { Container, Grid } from '@mui/material';
import React from 'react';
import { ProfileLayout } from '../../components/ProfileLayout';
import ReactionCard from '../../components/ReactionCard';
import useAxios from '../../services/api';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

export async function getServerSideProps({ req, res }) {
  const { axios } = useAxios({ req, res });
  const { data: reactions } = await axios(`/profile/reactions`);
  const { data: profile } = await axios.get('/profile');
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
      <Grid container spacing={isMobile ? 2.5 : 3.5}>
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