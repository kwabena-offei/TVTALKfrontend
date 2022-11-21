import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Header from '../components/Header';

import BackButton from './BackButton';

const style = {
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  bgcolor: '#090F27',
  padding: '0 195px 25px 195px',
};

const backButtonstyle = {
    position: 'relative',
    top: '60px',
    left: 0,
  };

const titleStyle = {
    color: '#EFF2FD',
    textAlign: 'center',
    fontWeight: 700,
    fontSize: '48px',
};

const FullsizeModal = ({ isOpen, onClose, title, children }) => {

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
      >
        <Box sx={style}>
            <Header />
            <BackButton
                title='Back'
                onClick={onClose}
                customStyles={backButtonstyle}
            />
            <Typography sx={titleStyle}>
                {title}
            </Typography>
            {children}
        </Box>
      </Modal>
    </div>
  );
}

export default FullsizeModal;