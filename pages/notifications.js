import { Stack, Grid } from '@mui/material';
import React from 'react';
import axios from "../services/api";
import NotificationCard from '../components/NotificationCard';
import { AccountSettingsLayout } from '../components/AccountSettingsLayout';

export async function getServerSideProps(context) {
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
  // console.log('notifications', notifications)
  return (
    <Grid item xs={12} md={10}>
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
