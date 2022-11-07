import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button, {})
    ({
        width: '153px',
        height: '76px',
        border: '1px solid #131B3F',
        borderRadius: '20px',
        marginRight: '20px', 
        ['@media (max-width:780px)'] : {
            display: 'flex',
            flexDirection: 'column',
            marginRight: '5px',
            width: '105px',
            height: '100px',
          }
    });

const StyledRating = styled(Typography, {})
    ({
        ['@media (max-width:780px)'] : {
            display: 'none',
          }
    });

const RatingButton = ({ title, rating, icon, checked, onClick, sx }) => {
    return (
        <StyledButton style={{ background: checked ? '#EFF2FD' : '#131B3F' }} onClick={onClick} sx={sx} >
            {icon}
            <Box>
                <Typography sx={{ fontSize: '16px', fontWeight: '600', textTransform: 'none' }} >{title}</Typography>
                <StyledRating sx={{ fontSize: '14px', fontWeight: '400', color: '#A5B0D6', textTransform: 'none' }}>
                    {rating}
                </StyledRating>
            </Box>
        </StyledButton>
    );
};

export default RatingButton;