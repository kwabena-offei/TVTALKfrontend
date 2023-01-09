import { Typography, Box, Stack, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

import ArrowBackIcon from "../../Icons/ArrowBackIcon";

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  lineHeight: "120%",
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  lineHeight: "1.125rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));

export const ReportTitle = ({ onClick }) => {
  const BUTTON_SIZE = '2em';

  return (
    <Stack direction="row" alignItems="flex-start" justifyItems="center">
      <IconButton
        aria-label="close"
        onClick={onClick}
        sx={{
          justifySelf: "flex-start",
          width: BUTTON_SIZE,
          height: BUTTON_SIZE,
          color: "text.secondary",
          fontSize: "1rem",
        }}
      >
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 0,
          gap: "6px",
          marginRight: BUTTON_SIZE
        }}
      >
        <Title>Report</Title>
        <Subtitle>Why are you reporting this account?</Subtitle>
      </Box>
    </Stack>
  );
};
