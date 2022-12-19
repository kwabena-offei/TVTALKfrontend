import { Box, Typography, IconButton, Button } from '@mui/material'
import { styled } from '@mui/system';
import { GhostButton } from '../GhostButton'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

export const DESCTOP_BUTTON_WIDTH = 115;
export const MOBILE_BUTTON_WIDTH = 36;

const StyledHeader = styled(Box, {}) ({
  height: '500px',
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
  ['@media (max-width:780px)'] : {
      height: '240px',
    }
});

export const ChatHeaderImage = ({ children, image }) => {
  return(
    <StyledHeader
      sx={{
        backgroundImage: `url(${image})`,
        flexFlow: 1,
        background: `linear-gradient(180deg, rgba(9, 15, 39, 0.3) 0%, #090F27 100%), url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center',
      }}
    >
      {children}
    </StyledHeader>
  )
}

export const ButtonBack = ({ ...props }) => {
  return (
    <Box>
      <GhostButton
        sx={{
          fontWeight: 600,
          lineHeight: '18px',
          fontSize: '16px',
          width: DESCTOP_BUTTON_WIDTH,
          height: '50px',
        }}
        startIcon={<ChevronLeftRoundedIcon fontSize='inherit' />}
        {...props}
      >
        Back
      </GhostButton>
    </Box>
  );
};

export const ButtonBackMobile = ({ ...props }) => {
const RoundedButton = styled(IconButton, {
  name: 'IconButton',
  slot: 'custom-styled'
}) ({
  boxSizing: 'inherit',
  border: '1px solid #131B3F',
  color: '#EFF2FD',
  fontSize: '1.25rem',
  backgroundColor: 'transparent'
})
  return (
    <Box width={MOBILE_BUTTON_WIDTH} height={MOBILE_BUTTON_WIDTH}>
      <RoundedButton
        variant='outlined'
        {...props}
      >
        <ChevronLeftRoundedIcon fontSize='inherit' />
      </RoundedButton>
    </Box>
  );
};