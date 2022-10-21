import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box, {
    name: "Test", // Changes class name in the DOM 
    slot: "boxWrapper" // appends slot name to the name above in the DOM
})({
        background: 'yellow',
        height: '300px',
        width: '300px'
    })
const StyledText = styled(Typography, {})({
    color: 'blue',
    fontWeight: 500,
    fontSize: '30px'

})

const login = props => {
    return (
        // Don't forget about the SX prop to change styles!
        <StyledBox sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
            <StyledText >Слава Україні</StyledText>
        </StyledBox>
    );
};

export default login;