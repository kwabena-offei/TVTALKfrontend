import React from "react";
import { Box, Link, Typography, Card, CardHeader, CardContent, Stack, Button, Divider } from "@mui/material";
// import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { styled } from "@mui/system";
import bg from "../public/assets/LoginBackground.jpg";
import { BackgroundPage } from '../components/BackgroundPage';
import { FormInput } from '../components/FormInput';

const StyledButton = styled(Button, {
  name: "custom", // Changes class name in the DOM
  slot: "outlined", // appends slot name to the name above in the DOM
})({
  backgroundColor: "#090F27",
  borderRadius: '6vh',
  border: '1px solid #131B3F'
});

const StyledCard = styled(Card, {
  name: "Form", // Changes class name in the DOM
  slot: "login", // appends slot name to the name above in the DOM
})({
  background: "#090F27",
  borderRadius: '6px',
  // height: "60vh",
  width: "50%",
});
const StyledText = styled(
  Typography,
  {}
)({
  color: "#fff",
  fontWeight: 500,
  fontSize: "30px",
});
{/* <StyledText>Слава Україні</StyledText> */}

const login = (props) => {
  return (
    <>
        <BackgroundPage source={bg} alternative='main-bg' />
        <Box
          marginY={20}
          paddingRight={20}
          flexDirection='column'
          justifyContent='center'
        >
            <StyledCard sx={{ marginLeft: '50%' }}> 
                <CardHeader
                  titleTypographyProps={{ textAlign: 'center', margin: 3, fontWeight: 700, fontSize: '40px' }}
                  title="Log In"
                  subheader={
                    <Stack direction='row' spacing={2} justifyContent='center'>
                      <Typography>New User?</Typography>
                      <Link href="#" underline="none" color='primary'>Create an account</Link>
                    </Stack>
                  }
                />
                <CardContent>
                    <Stack direction='column' spacing={2}>
                      <Stack direction='column' spacing={2}>
                        <Button variant='contained' color='primary'>Continue with Google</Button>
                        <Button variant='contained' color='secondary'>Continue with Facebook</Button>
                        <StyledButton variant='outlined' color='neutral'>Continue with Apple</StyledButton>
                      </Stack>
                      <Divider><Typography fontWeight={400} color="#636D92">Or</Typography></Divider>
                      <Stack direction='column' spacing={2}>
                      <FormInput
                          id='UsernameInput'
                          label="Email/Username"
                          type="email"
                          placeholder='example@mail.com'
                        />
                        <FormInput
                          id='UserPassword'
                          label='Password'
                          type="password"
                          placeholder='Enter Password'
                          endAdornment={'eye'}
                        />
                      </Stack>
                    </Stack>
                </CardContent>
            </StyledCard>

        </Box>
    </>
  );
};

export default login;
