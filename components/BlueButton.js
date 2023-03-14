import React from 'react';
import { Button, Typography } from '@mui/material';

const BlueButton = ({ title, ...props }) => {
    return (
        <Button style={{ background: '#3361FF', borderRadius: '10000px' }} variant='contained' {...props}>
            <Typography sx={{ color: '#EFF2FD' }} variant='string'>{title}</Typography>
        </Button>
    );
};

export default BlueButton;