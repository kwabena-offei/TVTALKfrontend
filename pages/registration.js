import React, { useState } from "react";
import dayjs from 'dayjs';
import { MenuItem, Card, CardContent, Stack, Button, Grid, Box } from "@mui/material";
import { styled } from "@mui/system";
import bg from "../public/assets/LoginBackground.jpg";
import { FormInput } from '../components/Login/FormInput';
import { FormSelect } from '../components/FormSelect'
import { CustomCardHeader } from "../components/Login/CustomCardHeader";
import { CalendarInput } from '../components/CalendarInput'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { TV_TALK_API } from "../util/constants";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

const StyledCard = styled(Card, {
  name: "Form", // Changes class name in the DOM
  slot: "registration", // appends slot name to the name above in the DOM
})({
  background: "#090F27",
  borderRadius: '6px',
  padding: '2.8vh 2.25vw'
});

export const genders = [
  {
    id: 'male',
    title: 'Male'
  },
  {
    id: 'female',
    title: 'Female'
  },
  {
    id: 'other',
    title: 'Other'
  }
]

export const gendersOptionsList = genders.map((gender) => { return <MenuItem key={`select-option-${gender.id}`}value={gender.id}>{gender.title}</MenuItem>});

const registration = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const now = dayjs()
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    birthday: now.toJSON(),
    zipCode: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setUserData({
      ...userData,
      [name]: value
    })
  }
  const handleDateChange = (change) => {
    console.log('change', change)
    setUserData({
      ...userData,
      birthday: change.toJSON()
    })
  }

  const onSubmit = async () => {
    console.log('submit values', userData)
    try {
      // -- send user/password to API --
      const { data: { token } } = await axios.post(`${TV_TALK_API}/users`, userData);
      setCookie('token', token);
      // -- redirect user to profile page --
      router.push('/profile/reactions');
    } catch (error) {
      console.log('registration error', error)
    }
  }
  return (
    <>
        <Box
        sx={isMobile ? {} : {
          backgroundImage: `url(${bg.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Grid container spacing={{lg: 3, md: 0}} sx={{paddingTop: isMobile ? 0 : 10.25}}>
          <Grid item xs={0} md={6} lg={6}/>
          <Grid item xs={12} md={5} lg={4}>
            <StyledCard sx={isMobile ? {} : { marginBottom: '6vh' }}>
                <CustomCardHeader
                  isMobile={isMobile}
                  sx={{padding: 1.5}}
                  title='Create an account'
                  subheader='Already have an account?'
                  subheaderLink='/login'
                  subheaderLinkTitle='Sign in'
                />
                <CardContent sx={{paddingY: 2.5}}>
                    <Stack direction='column' spacing={isMobile ? 2.75 : 2.5}>
                        <Stack direction='column' spacing={isMobile ? 2.75 : 2.5}>
                            <FormInput
                                id='usernameInput'
                                name='username'
                                label="username"
                                type="text"
                                value={userData.username}
                                placeholder='username'
                                onChange={handleChange}
                              />
                            <FormInput
                                id='EmailInput'
                                name='email'
                                label="Email"
                                type="email"
                                value={userData.email}
                                placeholder='example@mail.com'
                                onChange={handleChange}
                              />
                            <FormInput
                              id='UserPassword'
                              name='password'
                              label='Password'
                              type="password"
                              value={userData.password}
                              placeholder='Enter Password'
                              // endAdornment={'eye'}
                              onChange={handleChange}
                            />
                            <FormSelect
                                id="GenderInput"
                                name='gender'
                                value={userData.gender}
                                // value={genders[0].id}
                                label="Gender"
                                children={gendersOptionsList}
                                onChange={handleChange}
                              />
                              <CalendarInput
                                name='birthday'
                                inputFormat="MM/DD/YYYY"
                                value={userData.birthday}
                                onChange={handleDateChange}
                                inputProps={{variant: 'filled'}}
                              >
                                Date of Birth
                              </CalendarInput>
                              <FormInput
                                id='Zip Code'
                                name='zipCode'
                                value={userData.zipCode}
                                label="Zip Code"
                                placeholder='Zip Code'
                                onChange={handleChange}
                              />
                        </Stack>
                        <Button onClick={onSubmit} size="large" variant='contained' color='primary'>Next</Button>
                    </Stack>
                </CardContent>
            </StyledCard>
            </Grid>
            <Grid item xs={0} md={1} lg={2}/>
        </Grid>
        </Box>
    </>
  );
};

export default registration;
