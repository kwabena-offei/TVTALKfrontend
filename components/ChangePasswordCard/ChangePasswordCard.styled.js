import { styled } from "@mui/system";
import {
  Stack,
  CardHeader,
  Button,
  InputLabel,
  Box,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "../Icons/VisibilityIcon";
import VisibilityOff from "../Icons/VisibilityOffIcon";
import { useState } from "react";

export const ChangePasswordCardHeader = () => {
  return (
    <CardHeader
      action={<Actions />}
      title={"Change Password"}
      subheader={<Subheader />}
      classes={{ action: "align-self-center" }}
      titleTypographyProps={{
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "text.primary",
        component: "h2",
      }}
      subheaderTypographyProps={{
        fontWeight: 400,
        color: "text.secondary",
      }}
    />
  );
};

export const Actions = () => {
  return (
    <Stack direction="row" spacing={1.5}>
      <CancelButton />
      <SubmitButton />
    </Stack>
  );
};
export const CancelButton = ({ ...props }) => (
  <Button type="reset" variant="outlined" color="primary" sx={{ border: '1.5px solid #090F27' }} {...props}>
    Cancel
  </Button>
);

export const SubmitButton = ({ ...props }) => (
  <Button type="submit" variant="contained" color="primary" {...props}>
    Submit
  </Button>
);

export const Subheader = ({ ...props }) => (
  <Typography {...props}>
    Passwords are case-sensitive and must be at least 6 characters.
  </Typography>
);

export const PasswordInput = ({ label, id, value, children, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Grid container spacing={2} sx={{ marginBottom: 3 }}>
      <Grid
        item
        md={4}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: { md: "center" },
          justifyContent: { md: "end" },
        }}
      >
        <Box>
          <InputLabel htmlFor={id}>{label}</InputLabel>
        </Box>
      </Grid>
      <Grid item md={8}>
        <TextField
          {...props}
          id={id}
          value={value}
          type={showPassword ? "text" : "password"}
          fullWidth
          placeholder="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff color="#636D92" /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        >
          {children}
        </TextField>
      </Grid>
    </Grid>
  );
};
