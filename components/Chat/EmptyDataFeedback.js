import { Box, Typography } from "@mui/material"

export const EmptyDataFeedback = ({ type, text }) => {
  const description = text ? text : `There are no ${type} yet.`
  return(
    <Box
    sx={{
      minHeight: '70px',
      width: '100%',
      padding: '4rem',
      textAlign: 'center'
    }}
    >
      <Typography color='text.secondary'>
        {description}
      </Typography>
    </Box>
  )
}