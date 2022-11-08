import { Container, Stack } from '@mui/material';
import React from 'react';
import axios from "../services/api";
import NotificationCard from '../components/NotificationCard';

export async function getServerSideProps(context) {
  const { data: notifications } = await axios(`/notifications`);
  return {
    props: {
      notifications
    },
  };
}

export default function Page({ notifications }) {
  const { results: notificationsList, pagination } = notifications;
  console.log('notifications', notifications)
  return (
    <>
      <Container>
        <Stack spacing={2}>
          {notificationsList?.map((notification) => {
            return (
              <NotificationCard key={notification.id} {...notification} />
            );
          })}  
        </Stack>
      </Container>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <div>{page}</div>;
};
