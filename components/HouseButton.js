import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const HouseButton = ({ }) => {

  return (
    <IconButton
      style={{
        background: 'var(--background-color, #090F27)',
        borderRadius: '63px',
        boxShadow: 'none',
        border: '1.5px solid var(--card-color, #131B3F)'
      }}
      variant='contained'
    >
      <HomeOutlinedIcon htmlColor='#919CC0' />
    </IconButton >
  );
};

export default HouseButton;
