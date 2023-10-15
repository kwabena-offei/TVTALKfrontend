import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Badge from '@mui/material/Badge';
import useAxios from '../services/api';

const NotificationButton = ({ token }) => {
  const { axios } = useAxios();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      let resp = await axios.get('/notifications');
      setNotifications(resp.data.results.filter((notification) => !notification.read_at));
    };
    fetchNotifications();
  }, [token]);


  return (
    <Badge badgeContent={notifications.length} color="primary">
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
    </Badge>
  );
};

export default NotificationButton;
