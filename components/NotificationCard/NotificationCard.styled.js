import { styled } from "@mui/system";
import { Typography, Card, Button } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

export const CardWrapper = styled(Card, {
  name: "Notification",
  slot: "custom-card"
})({
  backgroundColor: '#131B3F',
  borderRadius: '6px'
})

export const NotificationMessageText = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return <Typography color='text.primary' sx={{ 
    fontSize: isMobile ? 14 : 20,
    lineHeight: '120%'
  }}>{children}</Typography>
}

export const FollowButton = ({...props}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Button
      {...props}
      aria-label="follow"
      variant="contained"
      color="primary"
      size='small'
      sx={{
        paddingX: isMobile ? 2.5 : 3,
        paddingY: 1,
        fontWeight: isMobile ? 500 : 600
      }}
      >
      Follow
    </Button>
  )
}