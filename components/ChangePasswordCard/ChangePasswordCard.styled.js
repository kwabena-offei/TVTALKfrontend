import { styled } from "@mui/system";
import { Stack, CardHeader, Button, Select, InputLabel, FormHelperText, TextField, Typography, Grid } from "@mui/material";
import { OutlinedButton } from "../OutlinedButton";
import Link from "next/link";

export const ChangePasswordCardHeader = () => {
  return (
    <CardHeader
      action={<Actions />}
      title={'Change Password'}
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
  <Button type='reset' variant="outlined" color="primary" {...props}>
    Cancel
  </Button>
);

export const SubmitButton = ({ ...props }) => (
  <Button type='submit' variant="contained" color="primary" {...props}>
    Submit
  </Button>
);

export const Subheader = ({...props }) => (
  <Typography {...props}>
    Passwords are case-sensitive and must be at least 6 characters.
  </Typography>
);

export const TextInput = ({label, id, value, children, ...props}) => {
  return(
    <Grid container spacing={2}>
      <Grid item md={4}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
      </Grid>
      <Grid item md={8}>
        <TextField
          {...props}
          id={id}
          value={value}
          fullWidth
          sx={{ marginBottom: 3}}
        >{children}</TextField>  
      </Grid>
    </Grid>
  )
}

export const SelectInput = ({label, id, children, ...props}) => {
  return(
    <Stack direction='column' spacing={1}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        variant='outlined'
        {...props}
        id={id}
      >{children}</Select>
    </Stack>
  )
}