import React from "react";
import { Link, Typography, Card, CardContent, Stack, Button, Divider, Grid } from "@mui/material";
import { styled } from "@mui/system";
import bg from "../public/assets/LoginBackground.jpg";
import { BackgroundPage } from '../components/BackgroundPage';
import { FormInput } from '../components/FormInput';
import { OutlinedButton } from '../components/OutlinedButton'
import { CustomCardHeader } from "../components/Login/CustomCardHeader";

const StyledCard = styled(Card, {
  name: "Form", // Changes class name in the DOM
  slot: "login", // appends slot name to the name above in the DOM
})({
  background: "#090F27",
  borderRadius: '6px',
  padding: '2.8vh 3vw'
});

const login = (props) => {
  return (
    <>
        <div style={{width: '100%', height: '10vh'}}>header imitation</div>
        <BackgroundPage source={bg} alternative='main-bg' />
        <Grid container spacing={{lg: '3.6', md: '2'}} sx={{paddingTop: 10.25}}>
          <Grid item xs={0} md={6} lg={6}/>
          <Grid item xs={12} md={5} lg={4}>
            <StyledCard>
                <CustomCardHeader
                  title='Log In'
                  subheader='New user?'
                  subheaderLink='/registration'
                  subheaderLinkTitle='Create an account'
                />
                <CardContent sx={{paddingY: 2.5}}>
                    <Stack direction='column' spacing={3}>
                        <Stack direction='column' spacing={1.25}>
                            <Button variant='contained' color='primary' startIcon={'G'}>Continue with Google</Button>
                            <Button variant='contained' color='secondary' startIcon={'F'}>Continue with Facebook</Button>
                            <OutlinedButton startIcon={'A'}>Continue with Apple</OutlinedButton>
                        </Stack>
                        <Divider><Typography fontWeight={400} color="#636D92">Or</Typography></Divider>
                        <Stack direction='column' spacing={3}>
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
                              helpertext={<Link href="#" underline="none" color='primary'>Forgot Password?</Link>}
                            />
                        </Stack>
                        <Button variant='contained' color='primary'>Login</Button>
                    </Stack>
                </CardContent>
            </StyledCard>
            </Grid>
            <Grid item xs={0} md={1} lg={2}/>
        </Grid>
    </>
  );
};

export default login;
