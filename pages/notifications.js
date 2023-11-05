import { Stack, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import useAxios from "../services/api";
import NotificationCard from '../components/NotificationCard';
import { AccountSettingsLayout } from '../components/AccountSettingsLayout';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const { axios } = useAxios();

  useEffect(() => {
    // Define the function to make the PUT request to /notifications/read
    const markNotificationsAsRead = async () => {
      try {
        await axios.patch('/notifications/unread/all', {
          notification: {
            read: true
          }
        });
      } catch (error) {
        console.error('Error marking notifications as read:', error);
      }
    };

    // Call the function to mark notifications as read when the component mounts
    markNotificationsAsRead();
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
