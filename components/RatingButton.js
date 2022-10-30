import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button, {})
    ({
        width: '153px',
        height: '76px',
        border: '1px solid #131B3F',
        borderRadius: '20px'
    });

const RatingButton = ({ title, rating, icon, checked, onClick }) => {
    return (
        <StyledButton style={{ background: checked ? '#EFF2FD' : '#131B3F' }} onClick={onClick} >
            {icon}
            <Box>
                <Typography sx={{ fontSize: '16px', fontWeight: '600', textTransform: 'none' }} >{title}</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: '400', color: '#A5B0D6', textTransform: 'none' }}>
                    {rating}
                </Typography>
            </Box>
        </StyledButton>
    );
};

export default RatingButton;