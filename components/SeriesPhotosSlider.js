import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import Carousel from 'react-elastic-carousel';

const SeriesPhotoSlider = ({ photos }) => {
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
                    {'Photos'}
                </Typography>
            <Carousel itemsToShow={5} itemsToScroll={2} pagination={false} itemPadding={[0, 10]}>
                {photos?.map((photo, index) => (
                    <CardMedia
                        key={index}
                        src={photo.uri}
                        component="img"
                        alt='Series photo'
                        sx={{ borderRadius: '6px', height: '260px', width: `${photo.width}px` }}
                    /> 
                ))}
            </Carousel>
        </Box>
    );
};

export default SeriesPhotoSlider;