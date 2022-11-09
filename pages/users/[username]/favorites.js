import { Grid } from '@mui/material';
import React from 'react';
import { ProfileLayout, fetchAccount } from '../../../components/ProfileLayout';
import FavoriteCard from '../../../components/FavoriteCard/FavoriteCard'
import axios from '../../../services/api';

export async function getServerSideProps(context) {
    const { username } = context.query
    const { data: favorites } = await axios.get(`/users/${username}/favorites`)
    const profile = await fetchAccount(username);
    return {
        props: {
          favorites,
          profile
        }
    }
}

export default function Page({ favorites }) {
  const { results: favoritesList, pagination } = favorites;
  return (
      <Grid container spacing={3}>
        {favoritesList?.map((favorite) => {
					const { preferred_image_uri: image } = favorite
					return(
						<Grid key={`card-twShow-favorites-${favorite.id}`} item xs={12} sm={6} lg={3}>
							<FavoriteCard tvShow={{ ...favorite, image }} />
						</Grid>
					)
        })}
      </Grid>
  );
}

Page.getLayout = function getLayout(page) {
  return <ProfileLayout mode='currentUser'>{page}</ProfileLayout>;
};