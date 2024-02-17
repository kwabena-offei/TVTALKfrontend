import React, { useContext, useEffect, useMemo } from "react";
import { Grid } from "@mui/material";
import { ProfileLayout } from "../../components/ProfileLayout";
import FavoriteCard from "../../components/FavoriteCard/FavoriteCard";
import useAxios from "../../services/api";
import { AuthContext } from "../../util/AuthContext";

export default function Page({ favorites, mutateProfile }) {
  const { results: favoritesList } = favorites;
  const { fetchFavorites, favorites: allFavorites } = useContext(AuthContext);

  useEffect(() => {
    mutateProfile();
  }, []);

  const filteredFavorites = favoritesList.filter((favorite) =>
    allFavorites.shows?.includes(favorite.tmsId)
  );

  return (
    <Grid container spacing={3}>
      {filteredFavorites?.map((favorite) => {
        const { preferred_image_uri: image } = favorite;
        return (
          <Grid
            key={`card-twShow-favorites-${favorite.id}`}
            item
            xs={12}
            sm={6}
            lg={3}
          >
            <FavoriteCard
              tvShow={{ ...favorite, image }}
              fetchFavorites={fetchFavorites}
              mutateProfile={mutateProfile}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export async function getServerSideProps({ req, res }) {
  const { axios } = useAxios({ req, res });
  const { data: profile } = await axios.get("/profile");
  const { data: favorites } = await axios.get(`/profile/favorites`);
  return {
    props: {
      favorites,
      profile,
    },
  };
}

Page.getLayout = function getLayout(page) {
  return <ProfileLayout mode="profile">{page}</ProfileLayout>;
};
