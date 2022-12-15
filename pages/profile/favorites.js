import { Grid } from '@mui/material';
import React from 'react';
import { ProfileLayout, fetchProfile } from '../../components/ProfileLayout';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard'
import useAxios from '../../services/api';

export async function getServerSideProps({ req, res }) {
  const { axios } = useAxios({ req, res });
  const { data: profile } = await axios.get('/profile');
  const { data: favorites } = await axios.get(`/profile/favorites`)
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
  return <ProfileLayout mode='profile'>{page}</ProfileLayout>;
};