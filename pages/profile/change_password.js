import React from "react";
import { AccountSettingsLayout } from "../../components/AccountSettingsLayout";
import { ChangePasswordCard } from '../../components/ChangePasswordCard';
import useAxios from '../../services/api';

export async function getServerSideProps({ req, res }) {
  const { axios } = useAxios({ req, res });
  const { data: profile } = await axios.get('/profile');

  return {
    props: {
      menu: true,
      title: "Account Settings",
      profile
    },
  };
}

export default function Page({ profile }) {
  console.log('profile', profile)
  return (
    <ChangePasswordCard profile={profile} />
  );
}

Page.getLayout = function getLayout(page) {
  return <AccountSettingsLayout menu>{page}</AccountSettingsLayout>;
};