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
  const reactions = props?.reactions || '41 eactions'
  return(
    <StyledCard>
      <Box display="flex" justifyContent="center" alignItems="center" px={2.5} pt={2.5} pb={0.25}>
      <Avatar
        sx={{ width: 120, height: 120 }}
        aria-label={`avatar-${username}-${id}`}
        src={image}
        alt={`${username}_avatar`}
      >
        {username}
      </Avatar>
      </Box>
      <CardContent sx={{ textAlign: 'center'}} py={0}>
        <Typography variant="h5">{username}</Typography>
        <Typography variant="subtitle1" color='#919CC0'>{reactions}</Typography>
        <Button variant="contained" color="primary">Follow</Button>
      </CardContent>
      {/* <CardActions sx={{justifyContent: 'center'}}>
        
      </CardActions> */}
    </StyledCard>
  )
}
export default FollowerCard;