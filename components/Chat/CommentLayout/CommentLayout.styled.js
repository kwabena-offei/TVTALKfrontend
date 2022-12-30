import {
  Avatar,
  Box,
  Container,
  Stack,
  Typography,
  InputBase
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { PostButton, PostIconButton } from "../NewPostCard/NewPostCard.styled";

export const TabLabel = ({ count, title, isMobile }) => {
  return (
    <Typography
      sx={{
        fontSize: isMobile ? "1rem" : "1.75rem",
        lineHeight: "120%",
        fontWeight: isMobile ? 600 : 700,
      }}
    >{`${count} ${title}`}</Typography>
  );
};

export const ReplayInputWrapper = ({children, isMobile}) => (
  <Box
    sx={{
      background: 'linear-gradient(89.18deg, #0B228D 0%, #6184FF 129.11%)',
      width: '100%',
      justifyContent: 'center',
      paddingY: isMobile ? 1.25 : 3.75,
    }}
  >
    <Container maxWidth='xl' sx={{ paddingX: 2.5 }}>
    <Grid container>
      <Grid xs={0} md={2}/>
      <Grid xs={12} md={8}>
      <Stack
        direction='row'
        spacing={2}
        sx={{
          minHeight: isMobile ? '60px' : '120px',
          bgcolor: 'background.default',
          borderRadius: '171px',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingX: isMobile ? 1.25 : 5,
        }}
        >
          {children}
        </Stack>
      </Grid>
      <Grid xs={0} md={2} />
    </Grid>
    </Container>
  </Box>
)

export const ReplayDesktopInput = ({ profile, onPost}) => {
  return (
    <>
      <Avatar
        src={profile.image}
        alt={profile.username}
        sx={{
          width: '60px',
          height: '60px'
        }}
      />
        <InputBase
          variant='standard'
          placeholder="What’s on your mind?"
          sx={{ fontSize: '1.25rem' }}
          fullWidth
        />
      <PostButton onClick={onPost} title='Reply' sx={{ fontSize: '1rem' }} />
    </>
  )
}


export const ReplayMobileInput = ({ profile, onPost}) => {
  return (
    <>
      <InputBase
        variant='standard'
        placeholder="What’s on your mind?"
        sx={{ fontSize: '1rem', paddingX: 1.25 }}
        fullWidth
      />
      <PostIconButton onClick={onPost} />
    </>
  )
}
