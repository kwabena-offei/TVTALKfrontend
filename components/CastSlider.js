import React from 'react';
import { Box, Typography } from '@mui/material';
import ActorCard from '../components/ActorCard';
import Carousel from 'react-elastic-carousel';

const CastSlider = ({ cast }) => {
    return (
        <Box
            sx={{ marginTop: '60px' }}
        >
            <Typography sx={{ 
                    fontSize: '36px',
                    lineHeight: '47px',
                    color: '#EFF2FD',
                    fontWeight: '600',
                    marginBottom: '16px'
                }}>
                    {'Cast'}
                </Typography>
            <Carousel itemsToShow={5} itemsToScroll={2} pagination={false} itemPadding={[0, 10]}>
                {cast.map((actor, index) => (
                    <ActorCard
                        key={index}
                        name={actor.name}
                        characterName={actor.characterName}
                    />
                ))}
            </Carousel>
        </Box>
    );
};

export default CastSlider;