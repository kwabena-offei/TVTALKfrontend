import React from "react";
import { Grid, Box } from "@mui/material";
import bg from "../public/assets/LoginBackground.jpg";
import Login from "../components/Login";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={
        isMobile
          ? {}
          : {
              backgroundImage: `url(${bg.src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              flexGrow: 1,
            }
      }
    >
      <Grid
        container
        spacing={{ lg: 3.6, md: 2 }}
        sx={{ paddingTop: isMobile ? 0 : 10.25 }}
      >
        <Grid item xs={0} md={6} lg={6} />
        <Grid item xs={12} md={5} lg={4}>
          <Login isMobile={isMobile} />!!!
        </Grid>
        <Grid item xs={0} md={1} lg={2} />
      </Grid>
    </Box>
  );
};

export default login;
