import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button, {})
    ({
        width: '107px',
        height: '40px',
        border: '1px solid #131B3F',
        borderRadius: '20px',
        marginRight: '20px',
        color: '#3361FF',
        padding: '0',
        ['@media (max-width:780px)'] : {
            marginRight: '5px',
            width: '97px',
            height: '36px',
          }
    });

const SimpleRatingButton = ({ title, icon, checked, onClick, sx }) => {
    return (
        <StyledButton style={{ background: checked ? '#EFF2FD' : '#090F27' }} onClick={onClick} sx={sx} >
            {icon}
            <Box>
                <Typography sx={{ fontSize: '16px', fontWeight: '600', textTransform: 'none', marginLeft: '5px' }} >
                    {title}
                </Typography>
            </Box>
        </StyledButton>
    );
};

export default SimpleRatingButton;