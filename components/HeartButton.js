import React from 'react';
import { IconButton } from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const HeartButton = ({ onClick }) => {




  return (
    <IconButton
      style={{
        background: 'var(--background-color, #090F27)',
        borderRadius: '63px',
        boxShadow: 'none',
        border: '1.5px solid var(--card-color, #131B3F)'
      }}
      variant='contained'
      onClick={onClick}
    >
      <FavoriteBorderIcon htmlColor='#919CC0' />
    </IconButton>
  );
};

export default HeartButton;