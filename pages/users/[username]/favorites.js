import { Grid } from "@mui/material";
import React from "react";
import { UserLayout, fetchAccount } from "../../../components/UserLayout";
import FavoriteCard from "../../../components/FavoriteCard/FavoriteCard";
import useAxios from "../../../services/api";

export default function Page({ favorites }) {
  const { results: favoritesList, pagination } = favorites;
  return (
    <Grid container spacing={3}>
      {favoritesList?.map((favorite) => {
        const { preferred_image_uri: image } = favorite;
        return (
          <Grid
            key={`card-twShow-favorites-${favorite.id}`}
            item
            xs={12}
            sm={6}
            lg={3}
          >
            <FavoriteCard tvShow={{ ...favorite, image }} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const { axios } = useAxios(context);
  const { username } = context.query;

  const { data: favorites } = await axios.get(`/users/${username}/favorites`);

  const profile = await fetchAccount(username);
  return {
    props: {
      favorites,
      profile,
    },
  };
}

Page.getLayout = function getLayout(page) {
  return <UserLayout mode="currentUser">{page}</UserLayout>;
};
