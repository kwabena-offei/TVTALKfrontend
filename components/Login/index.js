import React, { useState } from "react";
import { CardContent, Stack, Button, Link, Typography } from "@mui/material";
import { OutlinedButton } from "../OutlinedButton";
import { CustomCardHeader } from "../Login/CustomCardHeader";
import { useRouter } from "next/router";
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
import useAxios from '../../services/api'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import AppleLogin from 'react-apple-signin-auth';
import { setCookie } from "cookies-next";
import getConfig from 'next/config';
import { ModalError } from './ModalError'

// -- get next.js config from environment variables (next.config.js) --
const { publicRuntimeConfig } = getConfig();

const Login = (props) => {
  const { isMobile } = props;
  const router = useRouter();
  const { axios } = useAxios();
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState('')
  const [openErrorMessage, setOpenErrorMessage] = useState(false);
  const handleOpenErrorMessage = (providerName, errorMessage) => {
    if (errorMessage) {
      setErrorMessage(errorMessage)
    } else {
      setErrorMessage(`Unable to log in via ${providerName}. Please try another method.`)
    }
    setOpenErrorMessage(true);
  };

  const handleCloseErrorMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorMessage(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // -- handle user/password auth --
  const onSubmit = async () => {
    try {
      // -- send user/password to API --
      const { data: { token } } = await axios.post(`/auth/login`, formValues);
      // -- set cookie with token --
      setCookie('token', token);
      // -- redirect user to profile page --
      router.push('/profile/reactions');
    } catch (error) {
      // -- show modal with error message in case of error from API --
      const { statusText } = error?.response
      handleOpenErrorMessage('casualLogin', statusText)
    }
  };

  // -- callback function for handling google auth --
  const handleResponseGoogle = async (googleResponse) => {
    try {
      // -- send request to API and exchange google token with local token --
      const apiResponse = await axios.post(`/auth/login_social`, {
        google_token: googleResponse.tokenId,
      });
      // -- set cookie with token --
      setCookie('token', apiResponse.data.token);
      // -- redirect user to profile page --
      router.push('/');
    } catch (event) {
      // -- show modal with error message in case of error from API --
      handleOpenErrorMessage('Google', event.response.data.error)
      // console.log('error', apiResponse.error)
      return false;
    }
  }

  // -- callback function for handling facebook auth --
  const handleResponseFacebook = async (facebookResponse) => {

    console.log('facebookResponse', facebookResponse)
    // -- create boolean variable that is true is facebook response status is unknown --
    const userDidNotCompleteFacebookLogin = facebookResponse.status === 'unknown';

    if (userDidNotCompleteFacebookLogin) {
      // TODO: write handler for this case too
      handleOpenErrorMessage('Facebook', "You are not complete the auth via Facebook.")
      return;
    }
    try {
      // -- send request to API and exchange google token with local token --
      console.log(facebookResponse)
      const apiResponse = await axios.post(`/auth/login_social`, {
        facebook_token: facebookResponse.accessToken,
        facebook_id: facebookResponse.userID,
      });

      // -- set cookie with token --
      setCookie('token', apiResponse.data.token);
      // -- redirect user to profile page --
      router.push('/');

    } catch (error) {
      // -- show modal with error message in case of error from API --
      handleOpenErrorMessage('Facebook')
      return false;
    }
  }

  // -- callback function for handling apple auth --
  const handleSuccessResponseApple = async (appleResponse) => {
    console.log('apple response: ', appleResponse);
    try {
      // -- send request to API and exchange apple token with local token --
      const apiResponse = await axios.post(`/auth/apple`, appleResponse);

      // -- set cookie with token --
      setCookie('token', apiResponse.data.token);
      // -- redirect user to profile page --
      router.push('/');

    } catch (error) {
      // -- show modal with error message in case of error from API --
      handleOpenErrorMessage('Apple')
      return false;
    }
  }

  const handleErrorResponseApple = (event) => {
    // -- show modal with error message in case of error from apple auth --
    console.log('apple event', event.error)
    handleOpenErrorMessage('Apple', event.error.replaceAll('_', ' '))
    console.log('apple event', event.error)
  }

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
            <GoogleLogin
              clientId={publicRuntimeConfig.GOOGLE_CLIENT_ID}
              render={renderProps => (
                <AuthIconButton
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  color="secondary" startIcon={<GoogleIcon />}>
                  Continue with Google
                </AuthIconButton>
              )}
              onSuccess={handleResponseGoogle}
              onFailure={handleResponseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
              appId={publicRuntimeConfig.FACEBOOK_APP_ID}
              // appId="206412420236756"
              autoLoad
              callback={handleResponseFacebook}
              render={renderProps => (
                <AuthIconButton
                  onClick={renderProps.onClick}
                  color="primary"
                  startIcon={<FacebookRounded />}>
                  Continue with Facebook
                </AuthIconButton>
              )}
            />
            <AppleLogin
              authOptions={{
                clientId: publicRuntimeConfig.APPLE_APP_ID,
                scope: 'name email',
                redirectURI: 'https://tvtalk.app/login',
                state: 'tvtalk',
                nonce: 'nonce',
                usePopup: true
              }}
              render={renderProps => (
                <OutlinedButton onClick={renderProps.onClick} size="large" sx={{ color: 'text.primary', fontSize: '1rem' }} startIcon={<Apple />}>
                  Continue with Apple
                </OutlinedButton>
              )}
              onSuccess={handleSuccessResponseApple}
              onError={handleErrorResponseApple}
            />
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
      <ModalError
        errorMessage={errorMessage}
        handleClose={handleCloseErrorMessage}
        open={openErrorMessage}
      />
    </LoginCard>
  );
};

export default Login;