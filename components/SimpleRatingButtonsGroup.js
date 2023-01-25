import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import SimpleRatingButton from './SimpleRatingButton';
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
        <Box>
            <StyledButtonsWrapper>
                <SimpleRatingButton
                    icon={<HeartIcon />}
                    title='Love it'
                    checked={true}
                />
                <SimpleRatingButton
                    icon={<StartIcon />}
                    title='Like it'
                />
                <SimpleRatingButton
                    icon={<BrokenHeartIcon />}
                    title='Leave it'
                />
            </StyledButtonsWrapper>
        </Box>
    );
};

export default SimpleRatingButtonsGroup;