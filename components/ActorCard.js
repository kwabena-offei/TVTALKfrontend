import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';

const ActorCard = ({ name, characterName }) => {
    return (
        <Box
            sx={{ width: '230px' }}
        >
            <CardMedia
                component="img"
                src="/assets/actor.png"
                alt='Actors photo'
                sx={{ borderRadius: '6px', height: "260px", width: "230px" }}
            />   
            <Box sx={{ marginTop: '14px' }}>
                <Typography sx={{ 
                    fontSize: '20px',
                    lineHeight: '26px',
                    color: '#EFF2FD',
                    textAlign: 'center'  
                }}>
                    {name}
                </Typography>
                <Typography sx={{ 
                    fontSize: '16px',
                    lineHeight: '21px',
                    color: '#919CC0',
                    textAlign: 'center' 
                }}>
                    {`(${characterName})`}
                </Typography>
            </Box>
        </Box>
    );
};

export default ActorCard;