import { Box, Stack, Grid, IconButton as MuiIconButton, styled } from "@mui/material";
import { NewsMainContainer } from "../NewsCard/NewsCard.styled";

export const IconButton = ({
  color = "#636D92",
  fontSize = "1.5rem",
  onClick,
  icon,
  size,
  ...props
}) => (
  <MuiIconButton
    sx={{
      color: color,
      fontSize: fontSize,
      width: size,
      height: size
    }}
    {...props}
    onClick={onClick}
  >
    {icon}
  </MuiIconButton>
);

export const PostInputWrapper = ({ children, isMobile, addition }) => (
  <Box
    sx={{
      background: "linear-gradient(89.18deg, #0B228D 0%, #6184FF 129.11%)",
      width: "100%",
      justifyContent: "center",
      paddingY: isMobile ? 1.25 : 3.75,
    }}
  >
    <NewsMainContainer maxWidth="xl">
      <GridLayout isMobile={isMobile} middleColProps={{ width: '100%' }}>
        <Stack
          direction="row"
          spacing={ isMobile ? 1.25 : 3.75 }
          sx={{
            minHeight: isMobile ? "60px" : "120px",
            bgcolor: "background.default",
            borderRadius: "171px",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingX: isMobile ? 1.25 : 5,
          }}
        >
          {children}
        </Stack>
        {addition}
      </GridLayout>
    </NewsMainContainer>
  </Box>
);

export const GridLayout = ({ children, isMobile, middleColProps, containerProps }) => {
  if (isMobile) {
    return (
      <Grid container {...containerProps}>
        <Grid item sm />
        <Grid item maxWidth={555} {...middleColProps}>
          {children}
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
  return (
    <Grid container {...containerProps}>
      <Grid item md />
      <Grid item maxWidth={1010} {...middleColProps}>
        {children}
      </Grid>
      <Grid item md />
    </Grid>
  );
};
