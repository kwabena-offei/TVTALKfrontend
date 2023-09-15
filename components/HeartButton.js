import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import { AuthContext } from '../util/AuthContext';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HeartButton = ({ itemId, itemType, identifier, onClick }) => {
  const { isAuthenticated, favorites, toggleFavorite } = useContext(AuthContext);
  const isFavorited = isAuthenticated && favorites[itemType] && favorites[itemType].includes(itemId);
  return (
    <IconButton
      style={{
        background: 'var(--background-color, #090F27)',
        borderRadius: '63px',
        boxShadow: 'none',
        border: '1.5px solid var(--card-color, #131B3F)'
      }}
      variant='contained'
      onClick={() => toggleFavorite({ identifier: identifier, liked: !isFavorited })}
    >
      {
        isFavorited ? (
          <FavoriteIcon htmlColor='#919CC0' />
        ) : (
          <FavoriteBorderIcon htmlColor='#919CC0' />
        )
      }
    </IconButton >
  );
};

export default HeartButton;
