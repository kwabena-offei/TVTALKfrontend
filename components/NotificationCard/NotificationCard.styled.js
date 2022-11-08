import { styled } from "@mui/system";
import { Box, Avatar, Typography, Card, Stack, CardActions, CardMedia } from "@mui/material";

export const CardWrapper = styled(Card, {
  name: "Notification",
  slot: "custom-card"
})({
  backgroundColor: '#131B3F',
  borderRadius: '8px',
})

// export const ReactionCardHashtags = ({ children }) => {
//   return <Typography color="#3361FF">{children}</Typography>
// }

// export const ReactionCardText = ({ children }) => {
//   return <Typography color='#EFF2FD' sx={{ fontSize: 20, lineHeight: '180%' }} >{children}</Typography>
// }

// export const ReactionCardActions = styled(CardActions)({
//   justifyContent: "space-between",
//   padding: '20px 30px',
// });

export const ReactionCardMedia = ({image}) => {
  return <CardMedia component="img"
    height="auto"
    image={image}
    alt="Show screenshot"
    sx={{ borderRadius: 2 }}
  />
}