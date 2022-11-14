import React, { useState } from "react";
import {
  Link,
  Typography,
  Card,
  Button,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import Visibility from "../Icons/VisibilityIcon";
import VisibilityOff from "../Icons/VisibilityOffIcon";
import { FormInput } from "./FormInput";

const StyledCard = styled(Card, {
  name: "Form", // Changes class name in the DOM
  slot: "login", // appends slot name to the name above in the DOM
})({
  background: "#090F27",
  borderRadius: "6px",
  padding: "2.8vh 3vw",
});

export const LoginCard = ({ children }) => <StyledCard>{children}</StyledCard>;

export const AuthIconButton = ({ children, ...props }) => {
  return (
    <Button {...props} size="large" variant="contained">
      {children}
    </Button>
  );
};

export const OrDivider = () => (
  <Divider>
    <Typography fontWeight={400} color="#636D92">
      Or
    </Typography>
  </Divider>
);

export const PasswordInput = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormInput
      {...props}
      id="UserPassword"
      label="Password"
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Enter Password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff color="#636D92" />
              ) : (
                <Visibility />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      helperText={
        <Link href="#" underline="none" color="primary">
          Forgot Password?
        </Link>
      }
    />
  );
};

export const EmailInput = ({ ...props }) => {
  return (
    <FormInput
      {...props}
      id="EmailInput"
      label="Email/Username"
      type="email"
      name="email"
      placeholder="example@mail.com"
    />
  );
};

export const UsernameInput = ({ ...props }) => {
  return (
    <FormInput
      {...props}
      id="UsernameInput"
      label="Email/Username"
      type="text"
      name="username"
      placeholder="example@mail.com"
    />
  );
};