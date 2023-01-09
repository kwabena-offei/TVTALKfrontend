import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Menu } from "@mui/material";

export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 300,
    filter: "drop-shadow(0px 0px 38px rgba(0, 0, 0, 0.4))",
    "& .MuiMenu-list": {
      padding: 0,
    },
    "& .MuiMenuItem-root": {
      fontSize: "1rem",
      lineHeight: "1.125rem",
      fontWeight: 500,
      padding: "0.875em 1em",
      "& .MuiSvgIcon-root": {
        fontSize: "inherit",
        marginRight: theme.spacing(1),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
