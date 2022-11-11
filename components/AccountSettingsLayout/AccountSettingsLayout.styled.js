import { styled } from "@mui/system";
import { Box, Typography, Stack, Container, CardHeader, CardContent } from "@mui/material";
import { OutlinedButton } from "../OutlinedButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

const BUTTON_WIDTH = "115px";

export const SectionTitle = ({ title }) => {
  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 5 }}>
        <ButtonBack />
        <Box sx={{ width: "100%", padding: 0, paddingRight: BUTTON_WIDTH }}>
          <Typography component='h1' fontWeight={700} fontSize={48} textAlign="center">
            {title}
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};
export const SectionSubtitle = ({ subtitle }) => {
  return (
    <CardHeader
      title={subtitle}
      titleTypographyProps={{
        textAlign: "center",
        fontWeight: 700,
        fontSize: "32px",
        lineHeight: "120%",
      }}
    />
  );
};

export const ButtonBack = ({ ...props }) => {
  return (
    <Box>
      <OutlinedButton
        onClick={() => {
          console.log("back button clicked");
        }}
        sx={{
          fontWeight: 600,
          lineHeight: "18px",
          fontSize: "16px",
          width: BUTTON_WIDTH,
          height: "50px",
        }}
        startIcon={<ChevronLeftRoundedIcon fontSize="inherit" />}
        {...props}
      >
        Back
      </OutlinedButton>
    </Box>
  );
};
// Terms | Policy | Feedback -- text variants
export const CasualText = ({ children }) => (
  <Typography
    color="text.secondary"
    variant="body1"
    sx={{ fontWeight: 400, lineHeight: "180%" }}
  >
    {children}
  </Typography>
);

export const SecondaryText = ({ children }) => (
  <Typography
    color="text.secondary"
    sx={{ fontSize: '1.125rem',fontWeight: 600, lineHeight: "180%" }}
  >
    {children}
  </Typography>
);

export const SubtitleHeader = ({ children }) => (
  <Typography
    variant="h6"
    color="text.primary"
    sx={{ fontWeight: 600, lineHeight: "180%" }}
  >
    {children}
  </Typography>
);
// 
export const StyledCardText = ({children}) => {
  return(
    <CardContent sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      gap: '20px'
    }}>{children}</CardContent>
  )
}
