import { Grid } from "@mui/material";
import React from "react";
import { ProfileLayout, fetchAccount } from '../../../components/ProfileLayout';
import FollowerCard from "../../../components/FollowerCard/FollowerCard";
import FollowerCardMobile from "../../../components/FollowerCard/FollowerCardMobile";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "../../../services/api";

export async function getServerSideProps(context) {
  const { username } = context.query
  const { data: followers } = await axios.get(`/users/${username}/followers`);
  const profile = await fetchAccount();
  return {
    props: {
      followers,
      profile,
    },
  };
}

export default function Page({ followers }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { results: followersList, pagination } = followers;
  return (
    <Grid container spacing={isMobile ? 2 : 3.75}>
      {followersList?.map((follower) => {
        return (
          <Grid key={`card-followers-${follower.id}`} item xs={12} md={3} lg={2}>
            {isMobile ? <FollowerCardMobile {...follower} /> : <FollowerCard {...follower} />}
          </Grid>
        );
      })}
    </Grid>
  );
}

Page.getLayout = function getLayout(page) {
  return <ProfileLayout mode='currentUser'>{page}</ProfileLayout>;
};
