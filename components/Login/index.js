import React, { useState } from "react";
import { CardContent, Stack, Button, Link } from "@mui/material";
import { OutlinedButton } from "../OutlinedButton";
import { CustomCardHeader } from "../Login/CustomCardHeader";
import {
  LoginCard,
  AuthIconButton,
  OrDivider,
  PasswordInput,
  EmailInput,
  UsernameInput
} from "./Login.styled";
import { FacebookRounded, Apple } from "@mui/icons-material";
import GoogleIcon from '../Icons/GoogleColorIcon'
import { TV_TALK_API } from "../../util/constants";
import axios from "axios";

const Login = ({isMobile}) => {
  // const [formValues, setFormValues] = useState({
  //   email: "",
  //   password: "",
  // });
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const authUrl = `${TV_TALK_API}/auth/login`

  const onSubmit = async () => {
    console.log("form values", formValues);
    // requared username - not email
    try {
      const { data } = await axios.post(authUrl, formValues)
      const { token } = data
      localStorage.setItem('TV_TALK_AUTH_TOKEN', token)
    } catch (error) {
      console.log('error', error)
    }
  };

  return (
    <LoginCard isMobile={isMobile}>
      <CustomCardHeader
        title="Log In"
        subheader="New user?"
        subheaderLink="/registration"
        subheaderLinkTitle="Create an account"
        isMobile={isMobile}
      />
      <CardContent sx={{ paddingY: 2.5 }}>
        <Stack direction="column" spacing={3}>
          <Stack direction="column" spacing={1.25}>
            <AuthIconButton color="secondary" startIcon={<GoogleIcon />}>
              Continue with Google
            </AuthIconButton>
            <AuthIconButton color="primary" startIcon={<FacebookRounded />}>
              Continue with Facebook
            </AuthIconButton>
            <OutlinedButton size="large" sx={{ color: 'text.primary', fontSize: '1rem' }} startIcon={<Apple />}>
              Continue with Apple
            </OutlinedButton>
          </Stack>
          <OrDivider isMobile={isMobile} />
          <Stack direction="column" spacing={isMobile ? 2.75 : 2.5}>
            {/* <EmailInput value={formValues.email} onChange={handleChange} /> */}
            <UsernameInput value={formValues.username} onChange={handleChange} />
            <div>
              <PasswordInput
                value={formValues.password}
                onChange={handleChange}
              />
              <Link href="#" underline="none" color="primary" sx={{ marginTop: 1.125, display: "flex", justifyContent: 'flex-end', fontSize: '0.875rem' }}>
                Forgot Password?
              </Link>   
            </div>
          </Stack>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Login
          </Button>
        </Stack>
      </CardContent>
    </LoginCard>
  );
};

export default Login;
