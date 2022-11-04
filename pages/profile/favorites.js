import { Grid, Container } from '@mui/material';
import React from 'react';
import { ProfileLayout, fetchProfile } from '../../components/ProfileLayout';
import { TV_TALK_API } from '../../util/constants';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard'
import mockData from '../../util/MockData/favorites_mock';

export async function getServerSideProps(context) {
	// ToDo: replace username with context value
    const username = 'funkparliament'
    let res = await fetch(`${TV_TALK_API}/users/${username}/favorites`)
    console.log(res)

    let favorites = await res.json()
    const profile = await fetchProfile()
    console.log(favorites)
    return {
        props: {
          favorites,
            profile
        }
    }
}

export default function Page(data) {
  const { favorites } = data;
  console.log("data", data);
  // const { results } = favorites
  const { results } = mockData
  return (
    // <Container maxWidth="xl" sx={{ marginTop: "2vh", paddingX: '2px!important' }}>
      <Grid container spacing={3}>
        {results.map((favorite) => {
					const { preferred_image_uri: image } = favorite
					return(
						<Grid key={`card-twShow-favorites-${favorite.id}`} item xs={12} sm={6} md={4} lg={3}>
							<FavoriteCard tvShow={{ ...favorite, image }} />
						</Grid>
					)
        })}
      </Grid>
    // </Container>
  );
}

Page.getLayout = function getLayout(page) {
  return <ProfileLayout>{page}</ProfileLayout>;
};