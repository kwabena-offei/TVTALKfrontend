import { Grid } from "@mui/material";
import React from "react";
import { ProfileLayout, fetchProfile } from "../../components/ProfileLayout";
import FollowerCard from "../../components/FollowerCard/FollowerCard";
import FollowerCardMobile from "../../components/FollowerCard/FollowerCardMobile";
import useAxios from '../../services/api';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

import { useQueryFollowing } from "../../entities/user/hooks";

export async function getServerSideProps({ req, res }) {
  const { axios } = useAxios({ req, res });
  const { data: profile } = await axios.get('/profile');
  const { data: following } = await axios.get(`/profile/following`);
  return {
    props: {
      following,
      profile,
    },
  };
}

export default function Page({ following: initialData }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { data: { data: following = [] } } = useQueryFollowing({
    initialData
  });

  return (
    <Grid container spacing={isMobile ? 2 : 3.75}>
      {following.results?.map((follower) => (
        <Grid key={`card-following-${follower.id}`} item xs={12} md={3} lg={2}>
          {isMobile ?
            <FollowerCardMobile follower={follower} /> :
            <FollowerCard follower={follower} {...follower} />
          }
        </Grid>
      ))}
    </Grid>
  );
}

Page.getLayout = function getLayout(page) {
  return <ProfileLayout mode='profile'>{page}</ProfileLayout>;
};
