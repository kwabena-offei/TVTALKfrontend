import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image'


const ActorCard = ({ name, characterName }) => {
    return (
        <Box
            sx={{ width: '230px' }}
        >
            <Image
                src="/assets/actor.png"
                height="260px"
                width="230px"
                alt='Actors photo'
                style={{ borderRadius: '6px' }}
            />   
            <Box>
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