import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Badge from '@mui/material/Badge';
import useAxios from '../services/api';
import { styled } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';

const NotificationButton = ({ token }) => {
  const { axios } = useAxios();
  const [notifications, setNotifications] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchNotifications = async () => {
      let resp = await axios.get('/notifications');
      setNotifications(resp.data.results.filter((notification) => !notification.read_at));
    };
    fetchNotifications();
  }, [token]);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: isMobile ? 10 : 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  return (
    <StyledBadge badgeContent={notifications.length} color="primary">
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
