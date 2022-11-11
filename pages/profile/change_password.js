import React from "react";
import { AccountSettingsLayout } from "../../components/AccountSettingsLayout";
import { fetchProfile } from '../../components/ProfileLayout/'
import { ChangePasswordCard } from '../../components/ChangePasswordCard'

export async function getServerSideProps(context) {
  const profile = await fetchProfile()
  return {
    props: {
      menu: true,
      title: "Account Settings",
      profile
    },
  };
}

export default function Page({profile}) {
  console.log('profile', profile)
  return (
    <ChangePasswordCard profile={profile}/>
  );
}

Page.getLayout = function getLayout(page) {
  return <AccountSettingsLayout menu>{page}</AccountSettingsLayout>;
};
