import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const StyledButton = styled(Button, {})({
    backgroundColor: 'transparent',
    color: '#A5B0D6',
    height: '50px',
    width: '115px',
    borderRadius: '49px',
    borderWidth: '1.5px',
    borderColor: '#131B3F',
    padding: '16px 22px',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '18px',
})

const BackButton = ({title, onClick}) => {
    return (
        <StyledButton
            iconSizeSmall
            onClick={onClick}
            startIcon={
            <ChevronLeftIcon
                size="small"
            />}
        >
            <span>{title}</span>
        </StyledButton>
    );
};

export default BackButton;