import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/router'

const StyledButton = styled(Button, {})({
    backgroundColor: 'transparent',
    color: '#A5B0D6',
    height: '50px',
    width: '115px',
    borderRadius: '49px',
    border: '1.5px solid #131B3F',
    padding: '16px 22px',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '18px',
    top: '40px',
    position: 'absolute',
    left: '194px',
})

const BackButton = ({title}) => {
    const router = useRouter();

    const handleGoBack = () => {
       router.back();
    };

    return (
        <StyledButton
            onClick={handleGoBack}
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