import React from 'react';
import { Typography, Box } from '@mui/material';
import RatingButton from './RatingButton';
import HeartsSmile from './HeartsSmile';
import StarSmile from './StarSmile';
import RollingEyesSmile from './RollingEyesSmile';

const RatingButtonsGroup = ({ love, like, dislike }) => {
    return (
        <Box
            sx={{ marginTop: '60px' }}
        >
            <Typography 
                sx={{ color: '#EFF2FD', fontSize: '36px', lineHeight: '43px', marginRight: '30px' }}
                variant='string'>
                    {'Ratings'}
            </Typography>
            <RatingButton
                icon={<HeartsSmile />}
                title='Love it'
                rating={love ? `${love}%` : ''}
                checked={true}
                sx={{ marginRight: '20px' }}
            />
            <RatingButton
                icon={<StarSmile />}
                title='Like it'
                rating={like ? `${like}%` : ''}
                sx={{ marginRight: '20px' }}
            />
            <RatingButton
                icon={<RollingEyesSmile />}
                title='Leave it'
                rating={dislike ? `${dislike}%` : ''}
            />
        </Box>
    );
};

export default RatingButtonsGroup;