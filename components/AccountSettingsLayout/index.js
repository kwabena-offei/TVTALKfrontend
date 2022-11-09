import React from "react";
import { Container, Grid, Button, Box, Typography } from "@mui/material";

import AppBar from '../AppBar';
import { SectionTitle } from "./AccountSettingsLayout.styled";

export const AccountSettingsLayout = ({ children }) => {
  const { props } = children
  const { title, menu } = props

  return (
    <>
      <AppBar />
      <SectionTitle title={title}/>
      <Container>
        <Grid container columnSpacing={3.5}>
          <Grid item xs={3}>
            {!!menu && <Box>Options menu</Box>}
          </Grid>
          <Grid item xs={9}>
            {children}
          </Grid>
        </Grid>  
      </Container>
    </>
  );
};