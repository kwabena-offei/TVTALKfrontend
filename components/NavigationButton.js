import React from 'react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';

const StyledButton = styled(Button, {})({
  background: '#2F88FF!important',
  borderRadius: '10000px'
})

const NavigationButton = ({ link, title, query }) => {
  const router = useRouter()

  const navigate = () => {
    router.push({
      pathname: link,
      query: query
    })
  }
  return (
    <StyledButton onClick={navigate}>
      <Typography sx={{ color: '#EFF2FD' }} variant='string'>{title}</Typography>
    </StyledButton>
  );
}

export default NavigationButton
