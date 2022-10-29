import { Box, Button, Container, Typography, Avatar, Stack } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';

export async function getServerSideProps(context) {
    const username = 'funkparliament'
    let res = await fetch(`https://api.tvtalk.app/users/${username}`)
    let profile = await res.json()
    console.log(profile)
    return {
        props: {
            profile: profile
        }, // will be passed to the page component as props
    }
}
const mockData = {
  username: 'funkparliament',
  image: 'https://lh3.googleusercontent.com/a/AATXAJx2ImOGTN8HnmebWEwEpEEANtn9Ul0Rb11WVAwj=s96-c',
  reactions_count: 8,
  favorites_count: 2,
  followers_count: null,
  following_count: null
}
const StyledBGBox = styled(Box, {
  name: 'gradient',
  slot: 'bg'
})({
  width: '100%',
  height: '18.5vh',
  background: `linear-gradient(89.18deg, #0B228D 0%, #6184FF 129.11%)`
})
const profile = ({ profile }) => {
  console.log('profile', profile)
  const {username, image} = profile
  return (
    <>
      <div style={{height: '9.2vh'}}>Header imitation</div>
      <StyledBGBox/>
      <Container maxWidth='xl'>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-end"
        spacing={4}
      >
        <Avatar
        alt={`${username}_avatar`}
        src={image}
        sx={{
          height: {
            lg: '250px',
            md: '150px',
            sm: '100px',
            xs: '60px'
          },
          width: {
            lg: '250px',
            md: '150px',
            sm: '100px',
            xs: '60px'
          },
          marginTop: {
            lg: '-125px',
            md: '-75px',
            sm: '-50px',
            xs: '-30px'
          },
          border: '10px solid #090F27'
        }} />
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
          spacing={4}
          paddingBottom={5.53}
        >
          <Typography variant='h3' sx={{fontWeight: 700}} margin={0}>{username}</Typography>
          <Button variant='contained' color='primary'>Follow</Button>  
        </Stack>
        </Stack>
      </Container>
    </>
    
  )

}


export default profile;