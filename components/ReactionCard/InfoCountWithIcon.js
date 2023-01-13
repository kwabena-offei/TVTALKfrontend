import {
  Typography,
  Stack
} from "@mui/material";

const InfoCountWithIcon = ({count, icon, isMobile, navigation}) => {
  return (
    <Stack direction="row" spacing={0.5} alignItems="center" sx={{fontSize: isMobile ? '0.875rem' : '1.25rem'}} onClick={navigation} >
      {icon}
      <Typography color='#A5B0D6' sx={{ fontWeight: 400, fontSize: 'inherit', lineHeight: '100%' }}>
        {count | 0}
      </Typography>
    </Stack>
  )
}
export default InfoCountWithIcon;