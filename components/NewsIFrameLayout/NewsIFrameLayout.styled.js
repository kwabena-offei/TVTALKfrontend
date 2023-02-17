import { Typography } from '@mui/material'

export const DesktopTitle = ({children}) => (
  <Typography component='h1' fontWeight={700} fontSize={40} textAlign='center'>
    {children}
  </Typography>
)