import { Grid, Container } from '@mui/material';
import React from 'react';
import { ProfileLayout, fetchProfile } from '../../components/ProfileLayout';
import FollowerCard from '../../components/FollowerCard/FollowerCard'

const mockData = {
	"pagination": {
		"current_page": 1,
		"total_pages": 1,
		"prev_page": null,
		"next_page": null,
		"total_count": 1,
		"current_per_page": 25
	},
	"results": [
    {
      "id": 6,
      "username": "The Rock",
      "image": "https://m.media-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UX214_CR0,0,214,317_AL_.jpg",
      "bio": "Dwayne Douglas Johnson, also known as The Rock"
    },
    {
      "id": 7,
      "username": "The Rock",
      "image": "https://m.media-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UX214_CR0,0,214,317_AL_.jpg",
      "bio": "Dwayne Douglas Johnson, also known as The Rock"
    },
    {
      "id": 8,
      "username": "The Rock",
      "image": "https://m.media-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UX214_CR0,0,214,317_AL_.jpg",
      "bio": "Dwayne Douglas Johnson, also known as The Rock"
    },
    {
      "id": 9,
      "username": "The Rock",
      "image": "https://m.media-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UX214_CR0,0,214,317_AL_.jpg",
      "bio": "Dwayne Douglas Johnson, also known as The Rock"
    },
    {
      "id": 16,
      "username": "The Rock",
      "image": "https://m.media-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UX214_CR0,0,214,317_AL_.jpg",
      "bio": "Dwayne Douglas Johnson, also known as The Rock"
    },
    {
      "id": 17,
      "username": "The Rock",
      "image": "https://m.media-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UX214_CR0,0,214,317_AL_.jpg",
      "bio": "Dwayne Douglas Johnson, also known as The Rock"
    },
    {
      "id": 18,
      "username": "The Rock",
      "image": "https://m.media-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UX214_CR0,0,214,317_AL_.jpg",
      "bio": "Dwayne Douglas Johnson, also known as The Rock"
    },
    {
      "id": 19,
      "username": "The Rock",
      "image": "https://m.media-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UX214_CR0,0,214,317_AL_.jpg",
      "bio": "Dwayne Douglas Johnson, also known as The Rock"
    }
  ]
}

export async function getServerSideProps(context) {
    const username = 'funkparliament'
    let res = await fetch(`https://api.tvtalk.app/users/${username}/followers`)
    console.log(res)

    let followers = await res.json()
    const profile = await fetchProfile()
    console.log(followers)
    return {
        props: {
          followers,
            profile
        }
    }
}

export default function Page(data) {
  const { followers } = data;
  console.log("data", data);
  // const { results } = followers
  const { results } = mockData
  return (
    // <Container maxWidth="xl" sx={{ marginTop: "2vh", paddingX: '2px!important' }}>
      <Grid container spacing={3}>
        {results?.map((follower) => {
					// const { preferred_image_uri: image } = follower
          // return <li key={follower.id}>{follower.title} </li>;
					return(
						<Grid key={`card-followers-${follower.id}`} item lg={2}>
              {/* <li>{follower.id}</li> */}
							<FollowerCard {...follower}/>
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