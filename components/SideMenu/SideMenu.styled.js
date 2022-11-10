import { Typography } from "@mui/material";

export const PrimaryMenuLabel = ({ label }) => {
  return (
    <Typography
      variant="h6"
      color="text.primary"
      sx={{ fontWeight: 600 }}
    >
      {label}
    </Typography>
  )
}

export const SecondaryMenuLabel = ({ label }) => {
  return (
    <Typography
      variant="h6"
      color="text.secondary"
      sx={{ fontWeight: 600 }}
    >
      {label}
    </Typography>
  )
}