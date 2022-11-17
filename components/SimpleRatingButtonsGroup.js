import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import RatingButton from './RatingButton';
import HeartIcon from './HeartIcon';
import StartIcon from './StartIcon';
import BrokenHeartIcon from './BrokenHeartIcon';

    const StyledButtonsWrapper = styled(Box, {})
    ({
        ['@media (max-width:780px)'] : {
            display: 'flex',
        }
    });

const SimpleRatingButtonsGroup = ({ onClick }) => {
    return (
        <Box
            sx={{ marginTop: '60px' }}
        >
            <StyledButtonsWrapper>
                <RatingButton
                    icon={<HeartIcon />}
                    title='Love it'
                    checked={true}
                />
                <RatingButton
                    icon={<StartIcon />}
                    title='Like it'
                />
                <RatingButton
                    icon={<BrokenHeartIcon />}
                    title='Leave it'
                />
            </StyledButtonsWrapper>
        </Box>
    );
};

export default SimpleRatingButtonsGroup;