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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          vulputate volutpat sagittis. Nullam volutpat tellus nec mattis
          dapibus. Duis elementum cursus mauris. Aenean gravida egestas
          tristique. Nullam eros lorem, imperdiet eget nibh ac, dignissim
          pretium justo. Donec placerat, mauris non scelerisque pellentesque,
          arcu turpis faucibus nisi, ut elementum diam lorem at est. Ut rutrum
          ex justo, vitae luctus leo dictum sagittis.
        </SecondaryText>
        <CasualText>
          Quisque auctor arcu eget convallis suscipit. Phasellus sit amet
          euismod est, at congue risus. Suspendisse blandit luctus mi ut
          consequat. Nulla velit ipsum, egestas non leo ac, tempus vulputate
          sem. Nullam gravida ipsum ipsum, vulputate finibus erat sagittis in.
          Nam in malesuada enim. Nulla in mauris quis orci imperdiet auctor a ac
          diam. Sed in orci dui. Nam ornare elit eu ex lacinia venenatis. Nam
          vehicula feugiat nunc at pulvinar.
        </CasualText>
        <CasualText>
          Donec felis nisl, dictum quis arcu id, rutrum mollis magna.
          Pellentesque venenatis vel nunc a ornare. Praesent tortor nisi,
          volutpat quis dui a, pellentesque consectetur elit. Curabitur sed
          felis scelerisque, consectetur turpis sit amet, convallis ipsum.
        </CasualText>
        <CasualText>
          Quisque suscipit enim eget fermentum ultrices. Fusce eget suscipit
          justo. Nam accumsan massa vel consequat dignissim. Aenean gravida
          mollis felis et congue. Nulla eu urna sed massa condimentum aliquam
          quis sit amet ante.
        </CasualText>
        <SubtitleHeader>Lorem ipsum</SubtitleHeader>
        <CasualText>
          Proin imperdiet maximus condimentum. Curabitur magna enim, blandit
          eget purus ut, porta blandit diam. Fusce et sodales justo. Fusce in
          quam massa. Aenean suscipit vestibulum urna eget pharetra. Quisque
          tempor tincidunt mi at tristique. Mauris congue laoreet scelerisque.
          Aliquam eget libero leo. Integer vulputate nunc sed gravida malesuada.
          Duis porta maximus purus, ultricies suscipit diam pellentesque sed.
          Nam fermentum nulla nisl, non sodales felis maximus vitae.
        </CasualText>
        <CasualText>
          Duis dignissim efficitur lectus et tincidunt. Aliquam interdum arcu
          vitae rhoncus facilisis. Curabitur porttitor mattis erat nec finibus.
          Duis urna elit, molestie vitae nunc id, volutpat ultrices lacus. Ut
          non libero volutpat, sagittis nisl quis, tempus augue. Nunc sem metus,
          ultricies dignissim hendrerit ut, posuere sit amet diam. Integer ac
          feugiat ipsum.
        </CasualText>
        <CasualText>
          Maecenas nec risus mattis lorem tincidunt viverra. Sed cursus luctus
          feugiat. Proin turpis odio, sodales sit amet nisi vel, volutpat
          blandit augue. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae;
        </CasualText>
        <SubtitleHeader>Lorem ipsum</SubtitleHeader>
        <CasualText>
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut
          tellus turpis, porta a congue fringilla, hendrerit quis erat. Nulla
          tristique magna eget nulla pretium euismod. Suspendisse id pulvinar
          leo. Suspendisse tempus orci sed leo sollicitudin dapibus. Praesent in
          leo ut mauris cursus bibendum ac quis sem. Aenean sollicitudin nunc
          eget leo semper porttitor. Sed scelerisque neque id orci facilisis
          vehicula. Aliquam ac urna commodo, aliquet lorem sed, aliquam eros.
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
        </CasualText>
      </StyledCardText>
    </Card>
  );
}

Page.getLayout = function getLayout(page) {
  return <AccountSettingsLayout menu>{page}</AccountSettingsLayout>;
};
