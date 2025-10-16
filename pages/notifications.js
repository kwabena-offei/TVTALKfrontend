import { Stack, Grid } from '@mui/material';
import React, { useEffect, useContext } from 'react';
import useAxios from "../services/api";
import NotificationCard from '../components/NotificationCard';
import { AccountSettingsLayout } from '../components/AccountSettingsLayout';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from '../util/AuthContext';

export async function getServerSideProps({ req, res }) {
  const { axios } = useAxios({ req, res });
  const { data: notifications } = await axios(`/notifications`);
  return {
    props: {
      notifications,
      title: "Notifications"
    },
  };
}

export default function Page({ notifications }) {
  const { results: notificationsList, pagination } = notifications;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { markAllNotificationsAsRead } = useContext(AuthContext);

  useEffect(() => {
    // Call the context function to mark all notifications as read
    // This will also immediately update the unreadCount in the context
    markAllNotificationsAsRead();
  }, []); // The empty dependency array ensures this effect runs only on component mount


  return (
    <Grid item xs={12} md={10} mt={isMobile ? 1.75 : 0}>
      <Stack spacing={2}>
        {notificationsList?.map((notification) => {
          return (
            <NotificationCard key={notification.id}>{notification}</NotificationCard>
          );
        })}
      </Stack>
    </Grid>
  );
}

Page.getLayout = function getLayout(page) {
  return <AccountSettingsLayout>{page}</AccountSettingsLayout>;
};
