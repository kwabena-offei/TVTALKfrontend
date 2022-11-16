import React from "react";
import { Container, Grid } from "@mui/material";
import { SectionTitle } from "./AccountSettingsLayout.styled";
import SideMenu from "../SideMenu";

export const AccountSettingsLayout = ({ children, menu }) => {
  const { props } = children
  const { title } = props

  return (
    <>
      <SectionTitle title={title}/>
      <Container sx={{ minHeight: '80vh', marginBottom: '5vh' }} maxWidth='xl'>
        <Grid container columnSpacing={3.5}>
          <Grid item xs={12} md={2.5}>
            {!!menu && <SideMenu />}
          </Grid>
          <Grid item xs={12} md={9.5}>
            {children}
          </Grid>
        </Grid>  
      </Container>
    </>
  );
};