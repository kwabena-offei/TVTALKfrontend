import { Grid } from "@mui/material";
import React from "react";
import { ProfileLayout, fetchProfile } from "../../components/ProfileLayout";
import FollowerCard from "../../components/FollowerCard/FollowerCard";
import FollowerCardMobile from "../../components/FollowerCard/FollowerCardMobile";
import useAxios from '../../services/api';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

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

export default function Page({ following }) {
  const { results: followingList, pagination } = following
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container spacing={isMobile ? 2 : 3.75}>
      {followingList?.map((follower) => {
        return (
          <Grid key={`card-following-${follower.id}`} item xs={12} md={3} lg={2}>
            {isMobile ? <FollowerCardMobile {...follower} /> : <FollowerCard {...follower} />}
          </Grid>
        );
      })}
    </Grid>
  );
}

Page.getLayout = function getLayout(page) {
  return <ProfileLayout mode='profile'>{page}</ProfileLayout>;
};
