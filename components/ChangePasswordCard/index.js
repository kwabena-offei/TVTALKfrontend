import { Card, CardContent, Grid, Stack } from "@mui/material";
import { ChangePasswordCardHeader, PasswordInput } from "./ChangePasswordCard.styled";

export const ChangePasswordCard = ({ profile }) => {
  return (
    <Card sx={{ paddingX: 4, paddingY: 4, backgroundColor: "#131B3F" }}>
      <ChangePasswordCardHeader />
      <CardContent>
        <PasswordInput id="Type-your-current-password" label="Type your current password" />
        <PasswordInput id="Type-your-new-password" label="Type your new password" />
        <PasswordInput id="Retype-your-new-password" label="Retype your new password" />
      </CardContent>
    </Card>
  );
};
