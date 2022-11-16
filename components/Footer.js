import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { styled, positions } from '@mui/system';

 
const StyledText = styled(Typography, {})({
    color: '#EFF2FD',
    fontWeight: 500,
    fontSize: '1rem',
})
const Footer = (props) => {
    return (
        <Box
        // mt={10}
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 60,
            backgroundColor: '#131B3F',
            width: '100%',
            bottom: 0,
            top: 'auto'
        }}
        >
            <StyledText>
                Copyright © 2022 TV Talk
            </StyledText>
        </Box>
    );
};

Footer.propTypes = {
    
};
Footer
export default Footer;Footer