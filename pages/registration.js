import React, { useState } from "react";
import dayjs from 'dayjs';
import { MenuItem, Card, CardContent, Stack, Button, Grid, TextField } from "@mui/material";
import { styled } from "@mui/system";
import bg from "../public/assets/LoginBackground.jpg";
import { BackgroundPage } from '../components/BackgroundPage';
import { FormInput } from '../components/FormInput';
import { FormSelect } from '../components/FormSelect'
import { CustomCardHeader } from "../components/Login/CustomCardHeader";
import { CalendarInput } from '../components/CalendarInput'

const StyledCard = styled(Card, {
  name: "Form", // Changes class name in the DOM
  slot: "registration", // appends slot name to the name above in the DOM
})({
  background: "#090F27",
  borderRadius: '6px',
  padding: '2.8vh 3vw'
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
  const now = dayjs()
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
    gender: '',
    birthday: now,
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
  console.log(userData)
  return (
    <>
        <div style={{width: '100%', height: '10vh'}}>header imitation</div>
        <BackgroundPage source={bg} alternative='main-bg' />
        <Grid container spacing={{lg: 3, md: 2}} sx={{paddingTop: 10.25}}>
          <Grid item xs={0} md={6} lg={6}/>
          <Grid item xs={12} md={5} lg={4}>
            <StyledCard>
                <CustomCardHeader
                  sx={{padding: 1.5}}
                  title='Create an account'
                  subheader='Already have an account?'
                  subheaderLink='/login'
                  subheaderLinkTitle='Sign in'
                />
                <CardContent sx={{paddingY: 2.5}}>
                    <Stack direction='column' spacing={3}>
                        <Stack direction='column' spacing={2}>
                            <FormInput
                                id='UsernameInput'
                                name='userName'
                                label="Username"
                                type="text"
                                value={userData.userName}
                                placeholder='Username'
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
                              endAdornment={'eye'}
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
                        <Button size="large" variant='contained' color='primary'>Next</Button>
                    </Stack>
                </CardContent>
            </StyledCard>
            </Grid>
            <Grid item xs={0} md={1} lg={2}/>
        </Grid>
    </>
  );
};

export default registration;
