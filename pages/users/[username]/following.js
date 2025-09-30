import { Grid } from "@mui/material";
import React from "react";
import { UserLayout, fetchAccount } from "../../../components/UserLayout";
import FollowerCard from "../../../components/FollowerCard/FollowerCard";
import FollowerCardMobile from "../../../components/FollowerCard/FollowerCardMobile";
import useAxios from "../../../services/api";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Page({ following }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { results: followingList, pagination } = following;

  return (
    <Grid container spacing={isMobile ? 2 : 3.75}>
      {followingList?.map((follower) => {
        return (
          <Grid
            key={`card-following-${follower.id}`}
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
  const { data: following } = await axios.get(`/users/${username}/following`);
  const profile = await fetchAccount(username, axios);
  return {
    props: {
      following,
      profile,
    },
  };
}

Page.getLayout = function getLayout(page) {
  return <UserLayout mode="currentUser">{page}</UserLayout>;
};
