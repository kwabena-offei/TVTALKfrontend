import { Avatar, Card, CardContent, Box, Typography, CardActions, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { FollowButton, UnfollowButton } from './FollowerCard.styled'

const StyledCard = styled(Card, {
  name: "Follower",
  slot: "custom-card"
}) ({
  backgroundColor: '#131B3F',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

const FollowerCard = ({ id, username, image, ...props }) => {
  // Todo: edit reactions when you get the real data from api
  const reactions = props.reactions ? `${props.reactions} reactions` : '0 reactions'
  // ToDo: set isFollow when get actual data from api
  const [isFollow, setIsFollow] = useState(false)
  const toggleIsFollow = () => setIsFollow(!isFollow)

  const handleClick = async () => {
    // ToDo: add callback to endpoint
    await console.log('change this handle click - id:', id)
    toggleIsFollow()
  }

  return (
    <StyledCard>
      <Box display="flex" justifyContent="center" alignItems="center" px={2.5} pt={2.5} pb={1}>
      <Avatar
        sx={{ width: 120, height: 120 }}
        aria-label={`avatar-${username}-${id}`}
        src={image}
        alt={`${username}_avatar`}
      >
        {username}
      </Avatar>
      </Box>
      <CardContent sx={{ textAlign: 'center', padding: 0.5 }}>
        <Typography variant="h5" component='div'>{username}</Typography>
        <Typography variant="subtitle2" color='#919CC0' component='div'>{reactions}</Typography>
      </CardContent>
      <CardActions sx={{justifyContent: 'center', padding: 1.25, paddingBottom: 2.5 }}>
        {isFollow ? <UnfollowButton onClick={handleClick} /> : <FollowButton onClick={handleClick} />}
      </CardActions>
    </StyledCard>
  )
}
export default FollowerCard;