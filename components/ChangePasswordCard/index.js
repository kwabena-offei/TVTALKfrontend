import { Card, CardContent, Grid, Stack } from "@mui/material";
import { ChangePasswordCardHeader, TextInput } from "./ChangePasswordCard.styled";

export const ChangePasswordCard = ({ profile }) => {
  return (
    <Card sx={{ paddingX: 4, paddingY: 4, backgroundColor: "#131B3F" }}>
      <ChangePasswordCardHeader />
      <CardContent>
        <TextInput id="Type-your-current-password" label="Type your current password" type="password" />
        <TextInput id="Type-your-new-password" label="Type your new password" type="password" />
        <TextInput id="Retype-your-new-password" label="Retype your new password" type="password" />
      </CardContent>
    </Card>
  );
};
