import { Avatar, Card, CardContent, Box, Typography, CardActions, Button } from "@mui/material";
import { styled } from "@mui/system";

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

  const handleClick = () => {
    console.log('change this handle click - id:', id)
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
        <Button variant="contained" color="primary" onClick={handleClick}>Follow</Button>
      </CardActions>
    </StyledCard>
  )
}
export default FollowerCard;