import { Stack, Grid } from '@mui/material';
import React from 'react';
import axios from "../services/api";
import NotificationCard from '../components/NotificationCard';
import { AccountSettingsLayout } from '../components/AccountSettingsLayout';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // console.log('notifications', notifications)
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
