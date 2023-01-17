import React, { useState } from "react";
import { IconButton, Drawer } from "@mui/material";
import MoreVertIcon from "../../Icons/MoreVertIcon";
import { StyledDrawer } from "./PopupActions.styled";
import { ListActions } from "./ListActions";


export const ActionsMenuMobile = ({ id, commentType, tmsId, header }) => {

  const [state, setState] = useState(false);

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(!state);
  };

  return (
    <>
      <IconButton
        sx={{ fontSize: "1.125rem", color: "text.secondary" }}
        onClick={toggleDrawer}
        aria-label="comment-options"
      >
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <StyledDrawer
        anchor={'bottom'}
        open={state}
        onClose={toggleDrawer}
      >
        <ListActions handleClose={toggleDrawer} id={id} commentType={commentType} tmsId={tmsId} header={header}/>
      </StyledDrawer>
    </>
  );
};
