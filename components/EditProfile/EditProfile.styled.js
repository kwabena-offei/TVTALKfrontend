import { styled } from "@mui/system";
import { Stack, CardHeader, Avatar, Button, Select, InputLabel, FormHelperText, TextField } from "@mui/material";
import Link from "next/link";

export const StyledActionsButton = styled(Button)({
  boxShadow: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  padding: '16px 32px',
  borderRadius: 32,
  height: '50px'
})

export const EditProfileHeader = ({ profile, isMobile }) => {
  const { image, username } = profile;
  return (
    <CardHeader
      sx={isMobile ? { paddingY: '30px', paddingX: '20px' } : {}}
      avatar={
        <Avatar
          sx={{ width: 80, height: 80 }}
          aria-label={`${username}-photo`}
          src={image}
          alt={`${username}-photo`}
        />
      }
      action={isMobile ? '' : <Actions />}
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

export const Actions = ({...props}) => {
  return (
    <Stack direction="row" spacing={1.5} {...props}>
      <CancelButton />
      <SaveButton />
    </Stack>
  );
};
export const CancelButton = ({ ...props }) => (
  <StyledActionsButton variant="outlined" color="primary" sx={{ border: '1.5px solid #090F27' }} {...props}>
    Cancel
  </StyledActionsButton>
);

export const SaveButton = ({ ...props }) => (
  <StyledActionsButton variant="contained" color="primary" {...props}>
    Save
  </StyledActionsButton>
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
        variant="filled"
        sx={{
          '.MuiInputBase-root': {
              bgcolor: 'background.default'
          }
        }}
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
        variant='filled'
        sx={{ backgroundColor: '#090F27', ...props.sx }}
        {...props}
        id={id}
      >{children}</Select>
    </Stack>
  )
}