import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const MainContent = () => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return(
    <Box
      sx={{
        backgroundColor: theme.palette.background,
        minHeight: "20vh",
      }}
    >
      {'content'}
    </Box>
  ) 
}