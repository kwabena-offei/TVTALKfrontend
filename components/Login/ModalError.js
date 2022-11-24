import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, SnackbarContent } from '@mui/material';

export const ModalError = ({ errorMessage, handleClose, open, registration }) => {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const message = (
    <React.Fragment>
      <Typography variant='h5'>{registration ? 'Registration Error' : 'Login Error'}</Typography>
      <Typography variant='subtitle1'>{errorMessage}</Typography>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <SnackbarContent
          action={action}
          message={message}
          sx={{backgroundColor: '#090F27', color: "#A5B0D6"} }/>
      </Snackbar>
    </div>
  );
}
