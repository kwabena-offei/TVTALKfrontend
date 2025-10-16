import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../util/AuthContext';

const NotificationButton = () => {
  const { unreadCount } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: isMobile ? 10 : 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  return (
    <StyledBadge badgeContent={unreadCount} color="primary">
      <IconButton
        style={{
          background: 'var(--background-color, #090F27)',
          borderRadius: '63px',
          boxShadow: 'none',
          border: '1.5px solid var(--card-color, #131B3F)'
        }}
        variant='contained'
      >
        <NotificationsOutlinedIcon htmlColor='#919CC0' />
      </IconButton >
    </StyledBadge>
  );
};

export default NotificationButton;
