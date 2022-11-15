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
  width: '180px',
  height: '180px',
  marginTop: '-90px',
  border: '8px solid #090F27'
});

export const ProfileUsername = styled(Typography, {})({
  margin: '20px',
  fontSize: '40px',
  fontWeight: 700
});

export const TabLabel = ({ count, title, isMobile }) => {
  return (
    <Stack direction={isMobile ? 'column' : 'row'} alignItems="center">
      <Typography sx={{
        fontSize: isMobile ? '18px' : '28px',
        fontWeight: '700',
        marginRight: isMobile ? 0 : '20px'
      }}>{count}</Typography>
      <Typography sx={{
        fontSize: isMobile ? '12px' : '24px',
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
      variant="contained"
      color="primary"
      sx={{
        paddingX: 4,
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '18px',
        height: '50px',
      }}
      >
      Follow
    </Button>
  )
}

export const EditProfileButton = ({...props}) => {
  return (
    <Button
      {...props}
      aria-label="edit-profile"
      variant="outlined"
      color="primary"
      sx={{
        backgroundColor: '#090F27',
        border: '1px solid #131B3F',
        paddingX: 4,
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '18px',
        height: '50px'
      }}
      >
      Edit Profile
    </Button>
  )
}