import { useContext } from "react";
import { AuthContext } from "../../../util/AuthContext";
import {
  Avatar,
  Box,
  Container,
  Stack,
  InputBase
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { PostButton, PostIconButton } from "../NewPostCard/NewPostCard.styled";

export const ReplyInputWrapper = ({children, isMobile}) => (
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

export const ReplyDesktopInput = ({ profile, onPost, message }) => {
  const isAuth = useContext(AuthContext);
  const { image, username } = isAuth ? profile : { image: '', username: '' };
  return (
    <>
      <Avatar
        src={image}
        alt={username}
        sx={{
          width: '60px',
          height: '60px'
        }}
      />
        <InputBase
          inputRef={message}
          readOnly={!isAuth}
          variant='standard'
          placeholder={ isAuth ? "What's on your mind?" : "Only authorized users can reply."}
          sx={{ fontSize: '1.25rem' }}
          fullWidth
        />
      <PostButton disabled={!isAuth} onClick={onPost} title='Reply' sx={{ fontSize: '1rem' }} />
    </>
  )
}


export const ReplyMobileInput = ({ profile, onPost, message }) => {
  const isAuth = useContext(AuthContext);
  return (
    <>
      <InputBase
        inputRef={message}
        variant='standard'
        readOnly={!isAuth}
        placeholder={ isAuth ? "What's on your mind?" : "Only authorized users can reply."}
        sx={{ fontSize: '1rem', paddingX: 1.25 }}
        fullWidth
      />
      <PostIconButton onClick={onPost} disabled={!isAuth} />
    </>
  )
}
