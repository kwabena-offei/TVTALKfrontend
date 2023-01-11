import React, { useState } from "react";
import { IconButton, MenuItem } from "@mui/material";
import MoreVertIcon from "../../Icons/MoreVertIcon";
import AttachmentIcon from "../../Icons/AttachmentIcon";
import { CloseRounded } from "@mui/icons-material";
import ShareIcon from "../../Icons/ShareIcon";
import UnfollowIcon from "../../Icons/UnfollowIcon";
import { StyledMenu } from "./PopupActions.styled";
import Report from "../Report";

export const ActionsMenu = ({ id, commentType }) => {
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
        keepMounted
        id={`card-custom-menu-${id}`}
        anchorEl={anchorEl}
        open={open}
        // onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <ShareIcon />
          Share to...
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <AttachmentIcon />
          Copy Link
        </MenuItem>
        <Report handleClose={handleClose} id={id} commentType={commentType}/>
        <MenuItem onClick={handleClose} disableRipple>
          <UnfollowIcon />
          Unfollow
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          disableRipple
          sx={{ color: "primary.main" }}
        >
          <CloseRounded />
          Cancel
        </MenuItem>
      </StyledMenu>
    </>
  );
};
