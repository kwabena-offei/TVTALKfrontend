import {
  Typography,
  Stack
} from "@mui/material";
// font-weight: 400;
// font-size: 20px;
// line-height: 100%;
const InfoCountWithIcon = ({count, icon}) => {
  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      {icon}
      <Typography color='#A5B0D6' sx={{ fontWeight: 400, fontSize: '20px', lineHeight: '100%' }}>
        {count | 0}
      </Typography>
    </Stack>
  )
}
export default InfoCountWithIcon;