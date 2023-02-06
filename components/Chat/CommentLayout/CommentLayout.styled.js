import { Typography } from "@mui/material";


export const TabLabel = ({ count, title, isMobile }) => {
  return (
    <Typography
      sx={{
        fontSize: isMobile ? "1rem" : "1.75rem",
        lineHeight: "120%",
        fontWeight: isMobile ? 600 : 700,
      }}
    >{`${count} ${title}`}</Typography>
  );
};
