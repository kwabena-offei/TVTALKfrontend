import { Box, Link, TextField, Typography } from '@mui/material';
import { fontWeight } from '@mui/system';
import React from 'react';
import NavigationButton from './NavigationButton';

const Header = props => {
  return (
    <Box className='wrapper' style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#FFF', padding: '3rem 2rem' }}>
      <Box>

        <Typography variant='string' style={{ fontSize: '4rem' }}>TV Talk</Typography>
        <Link href='/' style={{ color: 'white', textDecoration: 'none' }}>
          <Typography variant='string' style={{ fontSize: '1.8rem', fontWeight: 200, marginLeft: '6rem' }}>Chat By Show</Typography>
        </Link>
        <Link href='/news' style={{ color: 'white', textDecoration: 'none' }}>
          <Typography variant='string' style={{ fontSize: '1.8rem', fontWeight: 200, marginLeft: '3rem' }}>News</Typography>
        </Link>
      </Box>

      <TextField InputProps={{ disableUnderline: true }} sx={{ background: '#131B3F', borderRadius: '10000px', width: '300px', input: { color: '#FFF', fontSize: '1.6rem', fontWeight: 300, padding: '16px' } }} variant="filled" fullWidth placeholder='Search...' style={{ color: '#FFF', fontSize: '1.8rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
      {/* <Button onClick={() => { }} style={{ background: '#3361FF', borderRadius: '10000px' }} variant='contained'>
                <Typography sx={{ color: '#EFF2FD' }} variant='string'>Login</Typography>
            </Button> */}
      <NavigationButton
        size='large'
        link='/login'
        title='Login'
      />
    </Box >
  );
};


export default Header;