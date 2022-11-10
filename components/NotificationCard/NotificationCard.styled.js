import { styled } from "@mui/system";
import { Typography, Card, Button } from "@mui/material";

export const CardWrapper = styled(Card, {
  name: "Notification",
  slot: "custom-card"
})({
  backgroundColor: '#131B3F',
  borderRadius: '6px'
})

export const NotificationMessageText = ({ children }) => {
  return <Typography color='text.primary' sx={{ 
    fontSize: 20,
    lineHeight: '120%'
  }}>{children}</Typography>
}

export const FollowButton = ({...props}) => {
  return (
    <Button
      {...props}
      aria-label="follow"
      variant="contained"
      color="primary"
      size='small'
      sx={{
        paddingX: 3,
        paddingY: 1,
        fontWeight: 600
      }}
      >
      Follow
    </Button>
  )
}