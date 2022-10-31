import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from 'react';

const mockData = {
  pagination: {
    current_page: 1,
    total_pages: 1,
    prev_page: null,
    next_page: null,
    total_count: 8,
    current_per_page: 50
  },
  results: [
    {
      id: 357,
      text: 'Is this any good?',
      hashtag: null,
      user_id: 98,
      created_at: '2022-02-13T17:57:52.827Z',
      updated_at: '2022-02-13T17:57:52.827Z',
      show_id: 1822312,
      images: null,
      likes_count: null,
      sub_comments_count: null,
      videos: null,
      shares_count: 0,
      story_id: null,
      mute_notifications: false,
      status: 'active',
      tmsId: 'SH024314420000'
    }]}

export async function getServerSideProps(context) {
    const username = 'funkparliament'
    let res = await fetch(`https://api.tvtalk.app/users/${username}/reactions`)
    console.log(res)
    let reactions = await res.json()
    console.log(reactions)
    return {
        props: {
            reactions: reactions
        }, // will be passed to the page component as props
    }
}
const reactions = ({ reactions }) => {
  console.log('reactions', reactions)
  return (
    <Box>Reactions</Box>
  )

}


export default reactions;