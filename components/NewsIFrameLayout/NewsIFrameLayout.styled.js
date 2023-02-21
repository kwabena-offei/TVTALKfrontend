import { Typography } from '@mui/material'

export const DesktopTitle = ({children}) => (
  <Typography component='h1' fontWeight={700} fontSize='2.5rem' textAlign='center'>
    {children}
  </Typography>
)