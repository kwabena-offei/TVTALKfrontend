import React, { useState } from "react";
import { Grid } from "@mui/material";
import bg from "../public/assets/LoginBackground.jpg";
import { BackgroundPage } from "../components/BackgroundPage";
import Login from "../components/Login";

const login = (props) => {
  return (
    <>
      <BackgroundPage source={bg} alternative="main-bg" />
      <Grid
        container
        spacing={{ lg: "3.6", md: "2" }}
        sx={{ paddingTop: 10.25 }}
      >
        <Grid item xs={0} md={6} lg={6} />
        <Grid item xs={12} md={5} lg={4}>
          <Login />
        </Grid>
        <Grid item xs={0} md={1} lg={2} />
      </Grid>
    </>
  );
};

export default login;
