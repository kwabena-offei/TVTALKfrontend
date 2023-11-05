import React from "react";
import { Card } from "@mui/material";
import { AccountSettingsLayout } from "../../components/AccountSettingsLayout";
import {
  CasualText,
  SecondaryText,
  SubtitleHeader,
  SectionSubtitle,
  StyledCardText,
} from "../../components/AccountSettingsLayout/AccountSettingsLayout.styled";

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
      <SectionSubtitle subtitle="Privacy Policy" />
      <StyledCardText>
        <SecondaryText>
          Thank you for considering TV Talk, an app developed by WEW Entertainment. We take the privacy of our users very seriously and want to be transparent about how we collect, use, and protect their personal information. Please review our privacy policy below:        </SecondaryText>
        <CasualText>
          Collection of Information: We may collect personal information such as name, email address, and location data when a user creates an account, uses certain features of the app, or contacts our customer support.
        </CasualText>

        <CasualText>
          Use of Information: We use the collected information to provide and improve the app's features and services, personalize user experiences, and communicate with users about promotions or updates related to the Dc Fb app.
        </CasualText>

        <CasualText>
          Sharing of Information: We do not sell or rent user information to third parties. We may share information with service providers who assist in operating the app or with legal authorities in response to a subpoena, court order, or other legal process.
        </CasualText>

        <CasualText>
          Security: We take appropriate measures to protect the security of user information, including the use of encryption and other security technologies.
          Data Retention: We retain user information for as long as necessary to provide the app's services or as required by law.
        </CasualText>

        <CasualText>
          User Rights: Users have the right to access, correct, or delete their personal information, as well as the right to object to or restrict certain types of processing. Users can exercise these rights by contacting our customer support.
        </CasualText>
        <CasualText>Children's Privacy: We do not knowingly collect personal information from children under the age of 13. If we become aware of such information, we will delete it immediately.</CasualText>
        <CasualText>Changes to Privacy Policy: We reserve the right to update this privacy policy at any time. Users will be notified of any changes through the app or by email.</CasualText>
        <CasualText>By using TV Talk, users agree to the terms of this privacy policy. If you have any questions or concerns about our privacy practices, please contact our customer support.</CasualText>

        <SecondaryText>
          By using TV Talk, users agree to the terms of this privacy policy. If you have any questions or concerns about our privacy practices, please contact our customer support.
        </SecondaryText>
      </StyledCardText>
    </Card>
  );
}

Page.getLayout = function getLayout(page) {
  return <AccountSettingsLayout menu>{page}</AccountSettingsLayout>;
};
