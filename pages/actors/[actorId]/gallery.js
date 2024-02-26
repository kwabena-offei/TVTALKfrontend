import { Grid } from "@mui/material";
import React from "react";
import { ActorLayout } from "../../../components/ActorLayout/index";
import FavoriteCard from "../../../components/FavoriteCard/FavoriteCard";

export default function Page({ gallery }) {
  return (
    <Grid container spacing={3}>
      {gallery?.map((favorite) => {
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
  const { actorId } = context.params;
  return {
    props: { actorId },
  };
}

Page.getLayout = function getLayout(page) {
  return <ActorLayout>{page}</ActorLayout>;
};
