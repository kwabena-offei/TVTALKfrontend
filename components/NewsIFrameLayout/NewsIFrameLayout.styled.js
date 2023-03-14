import { Typography, styled } from "@mui/material";

export const DesktopTitle = styled(Typography)({
  fontWeight: 700,
  textAlign: "center",
  fontSize: "2.5rem",
  ["@media (max-width:900px)"]: {
    fontSize: "2rem",
  },
});
