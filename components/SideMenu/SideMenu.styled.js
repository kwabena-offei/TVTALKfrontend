import { Typography } from "@mui/material";

export const PrimaryMenuLabel = ({ label, isTablet }) => {
  return (
    <Typography
      variant="h5"
      color="text.primary"
      sx={{ fontWeight: 600, fontSize: isTablet ? '1.25rem' : '1.5rem' }}
    >
      {label}
    </Typography>
  )
}

export const SecondaryMenuLabel = ({ label, isTablet }) => {
  return (
    <Typography
      variant="h5"
      color="text.secondary"
      sx={{ fontWeight: 600, fontSize: isTablet ? '1.25rem' : '1.5rem' }}
    >
      {label}
    </Typography>
  )
}