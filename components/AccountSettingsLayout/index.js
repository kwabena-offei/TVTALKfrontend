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
      <Container sx={{minHeight: '80vh'}}>
        <Grid container columnSpacing={3.5}>
          <Grid item xs={3}>
            {!!menu && <SideMenu />}
          </Grid>
          <Grid item xs={9}>
            {children}
          </Grid>
        </Grid>  
      </Container>
    </>
  );
};