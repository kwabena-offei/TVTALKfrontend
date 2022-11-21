import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const StyledButton = styled(Button, {})({
    backgroundColor: 'transparent',
    color: '#3361FF',
    height: '50px',
    width: '145px',
    borderRadius: '49px',
    border: '1.5px solid #131B3F',
    padding: '16px 22px',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '18px',
    top: '0px',
    position: 'absolute',
    right: '155px',
    ['@media (max-width:780px)'] : {
        width: 'auto',
        height: '36px',
        right: '0px',
        border: 'none',

        '& span': {
            marginRight: '0'
        }
    }
});

const ViewAllButton = ({ onClick }) => {

    return (
        <StyledButton
            onClick={onClick}
            endIcon={
            <ChevronRightIcon
                size="small"
                sx={{ margin: 0 }}
            />}
        >
            <span>View All</span>
        </StyledButton>
    );
};

export default ViewAllButton;