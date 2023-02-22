import { useContext } from "react";
import { AuthContext } from "../../util/AuthContext";
import { Avatar, Box, Container, Stack, Grid, InputBase } from "@mui/material";
import { NewsMainContainer } from "../NewsCard/NewsCard.styled";

export const PostInputWrapper = ({ children, isMobile }) => (
  <GridLayout isMobile={isMobile}>
    <Stack
      direction='row'
      sx={{
        minHeight: isMobile ? '60px' : '120px',
        bgcolor: 'background.default',
        borderRadius: '171px',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingX: isMobile ? 1.25 : 5,
      }}
    >
      {children}
    </Stack>
  </GridLayout>
);

export const GridLayout = ({ children, isMobile }) => {
  if (isMobile) {
    return (
      <Grid container>
        <Grid item sm />
        <Grid item maxWidth={555}>
          {children}
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
  return (
    <Grid container spacing={2}>
      <Grid item md />
      <Grid item maxWidth={1010} md={8}>
        {children}
      </Grid>
      <Grid item md />
    </Grid>
  );
};
