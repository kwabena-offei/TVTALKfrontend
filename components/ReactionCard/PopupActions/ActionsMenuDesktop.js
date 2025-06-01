import React, { useState } from "react";
import { IconButton } from "@mui/material";
import MoreVertIcon from "../../Icons/MoreVertIcon";
import { StyledMenu } from "./PopupActions.styled";
import { ListActions } from "./ListActions";


export const ActionsMenuDesktop = ({ id, commentType, tmsId, header, onCopyLink }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        sx={{ fontSize: "1.125rem", color: "text.secondary" }}
        aria-controls={open ? `card-custom-menu-${id}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        aria-label="comment-options"
      >
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <StyledMenu
        id={`card-custom-menu-${id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <ListActions handleClose={handleClose} id={id} commentType={commentType} tmsId={tmsId} header={header} onCopyLink={onCopyLink} />
      </StyledMenu>
    </>
  );
};
