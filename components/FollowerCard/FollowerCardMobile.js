import { Avatar, Card, CardContent, Box, Typography, CardActions, Button, CardHeader } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { FollowButton, UnfollowButton } from './FollowerCard.styled'

const StyledCard = styled(Card, {
  name: "Follower",
  slot: "custom-card"
}) ({
  backgroundColor: '#131B3F',
  borderRadius: '6px',
  padding: 15
})

const FollowerCardMobile = ({ id, username, image, ...props }) => {
  // Todo: edit reactions when you get the real data from api
  const reactions = props.reactions ? `${props.reactions} reactions` : '0 reactions'
  const [isFollow, setIsFollow] = useState(false)
  const toggleIsFollow = () => setIsFollow(!isFollow)

  const handleClick = async () => {
    // ToDo: add callback to endpoint
    await console.log('change this handle click - id:', id)
    toggleIsFollow()
  }

  return (
    <StyledCard>
      <CardHeader
      sx={{ p: 0 }}
      classes={{ action: 'align-self-center mr-0'}}
      avatar={
        <Avatar
          sx={{ width: 50, height: 50 }}
          aria-label={`avatar-${username}-${id}`}
          src={image}
          alt={`${username}_avatar`}
        >
          {username}
        </Avatar>
      }
      title={username}
      subheader={reactions}
      action={
        isFollow ? <UnfollowButton onClick={handleClick} /> : <FollowButton onClick={handleClick} />
      }
      titleTypographyProps={{ fontSize: '1rem', fontWeight: 500, lineHeight: '130%' }}
      subheaderTypographyProps={{ fontSize: '0.75rem', lineHeight: '130%'}}
      >
      </CardHeader>
    </StyledCard>
  )
}
export default FollowerCardMobile;