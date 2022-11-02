import {
  Typography,
  Stack
} from "@mui/material";

const InfoCountWithIcon = ({count, icon}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {icon}
      <Typography variant="h6" color='#A5B0D6' sx={{ fontWeight: 400 }}>
        {count | 0}
      </Typography>
    </Stack>
  )
}
export default InfoCountWithIcon;