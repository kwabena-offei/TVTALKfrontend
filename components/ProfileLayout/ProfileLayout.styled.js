import { styled } from "@mui/system";
import { Box, Avatar, Typography, Stack, Button } from "@mui/material";

export const ProfileTopBar = styled(Box, {
  name: "gradient",
  slot: "bg",
})({
  width: "100%",
  height: "150px",
  background: `linear-gradient(89.18deg, #0B228D 0%, #6184FF 129.11%)`,
});

export const ProfileAvatar = styled(Avatar)({
  width: 180,
  height: 180,
  marginTop: '-90px',
  border: '8px solid #090F27'
});

export const ProfileUsername = styled(Typography, {})({
  margin: '20px',
  fontSize: '40px',
  fontWeight: 700
});

export const TabLabel = ({ count, title }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Typography sx={{
        fontSize: '28px',
        fontWeight: '700',
        marginRight: '20px'
      }}>{count}</Typography>
      <Typography sx={{
        fontSize: '24px',
        fontWeight: '500'
      }}>{title}</Typography>
    </Stack>
  )
}
export const FollowButton = ({...props}) => {
  return (
    <Button
      {...props}
      aria-label="follow"
      size="small"
      variant="contained"
      color="primary">
      Follow
    </Button>
  )
}