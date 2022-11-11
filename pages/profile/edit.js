import React from "react";
import { AccountSettingsLayout } from "../../components/AccountSettingsLayout";
import { EditProfileCard } from '../../components/EditProfile/'
import { fetchProfile } from '../../components/ProfileLayout/'

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
    <EditProfileCard profile={profile}/>
  );
}

Page.getLayout = function getLayout(page) {
  return <AccountSettingsLayout menu>{page}</AccountSettingsLayout>;
};
