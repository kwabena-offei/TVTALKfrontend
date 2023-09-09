import React from 'react';
import { Button, Typography } from '@mui/material';

const BlueButton = ({ title, ...props }) => {
  return (
    <Button style={{ background: '#3361FF', borderRadius: '10000px' }} variant='contained' {...props}>
      <Typography sx={{ color: '#EFF2FD', fontSize: 16, fontWeight: 600, padding: '0px 8px' }} variant='string'>{title}</Typography>
    </Button >
  );
};

export default BlueButton;