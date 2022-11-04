import React from 'react';
import { IconButton } from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const HeartButton = ({onClick}) => {

    return (
        <IconButton 
            style={{ background: '#090F27', borderRadius: '10000px', boxShadow: 'none' }}
            variant='contained'
            onClick={onClick}
        >
            <FavoriteBorderIcon htmlColor='#919CC0' />
        </IconButton>
    );
};

export default HeartButton;