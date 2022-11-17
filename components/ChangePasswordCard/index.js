import { Card, CardActions, CardContent, Grid, Stack } from "@mui/material";
import { Actions, ChangePasswordCardHeader, ChangePasswordCardHeaderMobile, PasswordInput } from "./ChangePasswordCard.styled";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

export const ChangePasswordCard = ({ profile }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card sx={{ paddingX: isMobile ? 0.5 : 4, paddingY:  isMobile ? 0.5 : 4, backgroundColor: "#131B3F" }}>
      {isMobile ? <ChangePasswordCardHeaderMobile /> : <ChangePasswordCardHeader />}
      <CardContent sx={isMobile && { paddingBottom: 0 }}>
        <PasswordInput isMobile={isMobile} id="Type-your-current-password" label="Type your current password" />
        <PasswordInput isMobile={isMobile} id="Type-your-new-password" label="Type your new password" />
        <PasswordInput isMobile={isMobile} id="Retype-your-new-password" label="Retype your new password" />
      </CardContent>
      { isMobile &&
        <CardActions sx={{ justifyContent: 'center', marginBottom: 2.75 }} >
          <Actions /> 
        </CardActions>
      }
    </Card>
  );
};
