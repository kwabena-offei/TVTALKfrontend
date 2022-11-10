import React from "react";
import { Card } from "@mui/material";
import { AccountSettingsLayout } from "../../components/AccountSettingsLayout";

export async function getServerSideProps(context) {
  return {
    props: {
      menu: true,
      title: "Account Settings",
    },
  };
}

export default function Page() {
  return (
    <Card sx={{ paddingX: 10, paddingY: 7.5, backgroundColor: "#131B3F" }}>
      <span>Edit profile</span>
    </Card>
  );
}

Page.getLayout = function getLayout(page) {
  return <AccountSettingsLayout menu>{page}</AccountSettingsLayout>;
};
