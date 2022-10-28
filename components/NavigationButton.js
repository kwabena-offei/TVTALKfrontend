import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const NavigationButton = ({ link, title, query }) => {
  const router = useRouter()

  const navigate = () => {
    router.push({
      pathname: link,
      query: query
    })
  }
  return (
    <Button variant='contained' color='primary' onClick={navigate}>
      {title}
    </Button>
  );
}

export default NavigationButton
