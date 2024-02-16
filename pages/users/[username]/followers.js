import { Grid } from "@mui/material";
import React from "react";
import { UserLayout, fetchAccount } from "../../../components/UserLayout";
import FollowerCard from "../../../components/FollowerCard/FollowerCard";
import FollowerCardMobile from "../../../components/FollowerCard/FollowerCardMobile";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useAxios from "../../../services/api";

export default function Page({ followers }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { results: followersList, pagination } = followers;
  return (
    <Grid container spacing={isMobile ? 2 : 3.75}>
      {followersList?.map((follower) => {
        return (
          <Grid
            key={`card-followers-${follower.id}`}
            item
            xs={12}
            md={3}
            lg={2}
          >
            {isMobile ? (
              <FollowerCardMobile {...follower} />
            ) : (
              <FollowerCard {...follower} />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const { axios } = useAxios(context);
  const { username } = context.query;
  const { data: followers } = await axios.get(`/users/${username}/followers`);
  const profile = await fetchAccount(username);
  return {
    props: {
      followers,
      profile,
    },
  };
}

Page.getLayout = function getLayout(page) {
  return <UserLayout mode="currentUser">{page}</UserLayout>;
};
