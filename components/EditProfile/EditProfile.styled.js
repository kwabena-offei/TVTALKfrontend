import { styled } from "@mui/system";
import { Stack, CardHeader, Avatar, Button, Select, InputLabel, FormHelperText, TextField } from "@mui/material";
import { OutlinedButton } from "../OutlinedButton";
import Link from "next/link";

export const EditProfileHeader = ({ profile }) => {
  const { image, username } = profile;
  return (
    <CardHeader
      avatar={
        <Avatar
          sx={{ width: 80, height: 80 }}
          aria-label={`${username}-photo`}
          src={image}
          alt={`${username}-photo`}
        />
      }
      action={<Actions />}
      title={username}
      subheader={<SubheaderLink href={"#"} />}
      classes={{ action: "align-self-center" }}
      titleTypographyProps={{
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "text.primary",
        component: "h2",
      }}
      subheaderTypographyProps={{
        fontWeight: 400,
        fontSize: "1rem",
        color: "primary",
      }}
    />
  );
};

export const Actions = () => {
  return (
    <Stack direction="row" spacing={1.5}>
      <CancelButton />
      <SaveButton />
    </Stack>
  );
};
export const CancelButton = ({ ...props }) => (
  <Button variant="outlined" color="primary" {...props}>
    Cancel
  </Button>
);

export const SaveButton = ({ ...props }) => (
  <Button variant="contained" color="primary" {...props}>
    Save
  </Button>
);

export const SubheaderLink = ({ href, ...props }) => (
  <Link href={href} {...props}>
    Change Profile Photo
  </Link>
);

export const TextInput = ({label, id, value, children, ...props}) => {
  return(
    <Stack direction='column' spacing={1}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <TextField
        {...props}
        id={id}
        value={value}
        fullWidth
      >{children}</TextField>
      {!!props.helpertext && 
        <FormHelperText
        >
          {props.helpertext}
        </FormHelperText>
      }
    </Stack>
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