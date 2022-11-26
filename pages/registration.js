import React, { useState } from "react";
import { MenuItem, Card, CardContent, Stack, Button, Grid, Box, Container } from "@mui/material";
import { styled } from "@mui/system";
import bg from "../public/assets/LoginBackground.jpg";
import { FormInput } from '../components/Login/FormInput';
import { PasswordInput } from '../components/Login/Login.styled'
import { FormSelect } from '../components/FormSelect'
import { CustomCardHeader } from "../components/Login/CustomCardHeader";
import { CalendarInput } from '../components/CalendarInput'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { TV_TALK_API } from "../util/constants";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { ModalError } from '../components/Login/ModalError'

const StyledCard = styled(Card, {
  name: "Form", // Changes class name in the DOM
  slot: "registration", // appends slot name to the name above in the DOM
})({
  background: "#090F27",
  borderRadius: '6px',
  padding: '2.8vh 2.25vw'
});

// -- constants for registration or edit user --
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

export const gendersOptionsList = genders.map((gender) => {
  return (
    <MenuItem key={`select-option-${gender.id}`} value={gender.id}>
      {gender.title}
    </MenuItem>
  );
});

const registration = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    birthday: '',
    zipCode: ''
  })
  // -- validation errors collection from API: initial state --
  const [errors, setErrors] = useState({
    password: [],
    email: [],
    username: []
  })
  // -- state and handlers for any unhandled errors from API --
  const [openErrorMessage, setOpenErrorMessage] = useState(false)

  const handleOpenErrorMessage = () => {
    setOpenErrorMessage(true);
  };

  const handleCloseErrorMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorMessage(false);
  };

  const handleChange = (e) => {
    const {name, value} = e.target
    setUserData({
      ...userData,
      [name]: value
    })
  }
  const handleDateChange = (change) => {
    setUserData({
      ...userData,
      birthday: change.toJSON()
    })
  }

  const onSubmit = async () => {
    try {
      // -- send user data to API --
      const { data: { token } } = await axios.post(`${TV_TALK_API}/users`, userData);
      // -- set cookie with token --
      setCookie('token', token);
      // -- redirect user to profile page --
      router.push('/profile/reactions');
    } catch (error) {
      const { data: errors } = error.response
      if (!errors) {
        // -- show modal with error message in case of unhandled error from API --
        handleOpenErrorMessage()
        return false;
      }
      // -- set and show validation errors from API --
      setErrors(errors)
    }
  }

  return (
    <Box
      sx={
        isMobile
          ? {}
          : {
              backgroundImage: `url(${bg.src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              flexGrow: 1,
            }
      }
    >
      <Container maxWidth="xl" sx={isMobile ? { paddingX: 0 } : {}}>
        <Grid container sx={{ paddingTop: isMobile ? 0 : 10.25 }}>
          <Grid item xs={0} md={6} />
          <Grid item xs={12} md={5}>
            <StyledCard sx={isMobile ? {} : { marginBottom: "6vh" }}>
              <CustomCardHeader
                isMobile={isMobile}
                sx={{ padding: 1.5 }}
                title="Create an account"
                subheader="Already have an account?"
                subheaderLink="/login"
                subheaderLinkTitle="Sign in"
              />
              <CardContent sx={{ paddingY: 2.5 }}>
                <Stack direction="column" spacing={isMobile ? 2.75 : 2.5}>
                  <Stack direction="column">
                    <FormInput
                      id="usernameInput"
                      required={true}
                      error={errors.username?.length > 0}
                      name="username"
                      label="Username"
                      type="text"
                      value={userData.username}
                      placeholder="username"
                      onChange={handleChange}
                      helperText={errors.username?.[0] || " "}
                    />
                    <FormInput
                      id="EmailInput"
                      required={true}
                      error={errors.email?.length > 0}
                      name="email"
                      label="Email"
                      type="email"
                      value={userData.email}
                      placeholder="example@mail.com"
                      onChange={handleChange}
                      helperText={errors.email?.[0] || " "}
                    />
                    <PasswordInput
                      required={true}
                      error={errors.password?.length > 0}
                      value={userData.password}
                      onChange={handleChange}
                      helperText={errors.password?.[0] || " "}
                    />
                    <FormSelect
                      id="GenderInput"
                      name="gender"
                      value={userData.gender}
                      placeholder="Choose Gender"
                      label="Gender"
                      displayEmpty
                      children={gendersOptionsList}
                      onChange={handleChange}
                      inputProps={{ helperText: " " }}
                    />
                    <CalendarInput
                      name="birthday"
                      inputFormat="MM/DD/YYYY"
                      placeholder="mm/dd/yyyy"
                      value={userData.birthday}
                      onChange={handleDateChange}
                      inputProps={{ variant: "filled", helperText: " " }}
                      labelProps={{ sx: { color: "#EFF2FD" } }}
                      isMobile={isMobile}
                    >
                      Date of Birth
                    </CalendarInput>
                    <FormInput
                      id="Zip Code"
                      name="zipCode"
                      value={userData.zipCode}
                      label="Zip Code"
                      placeholder="Zip Code"
                      helperText=" "
                      onChange={handleChange}
                    />
                  </Stack>
                  <Button
                    onClick={onSubmit}
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    Next
                  </Button>
                </Stack>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={0} md={1} />
        </Grid>
      </Container>
      <ModalError
        registration
        errorMessage="Sorry, something went wrong. Please try again later."
        handleClose={handleCloseErrorMessage}
        open={openErrorMessage}
      />
    </Box>
  );
};

export default registration;
