import React, { useContext, useState } from "react";
import { MenuItem } from "@mui/material";
import AttachmentIcon from "../../Icons/AttachmentIcon";
import { CloseRounded } from "@mui/icons-material";
import ShareIcon from "../../Icons/ShareIcon";
import UnfollowIcon from "../../Icons/UnfollowIcon";
import Report from "../Report";
import { useRouter } from "next/router";
import { TV_TALK_HOST, TV_TALK_HOST_LOCAL } from "../../../util/constants";
import { copyToClipboard } from '../../../util/helpers';
import getConfig from 'next/config';
import { AuthContext } from "../../../util/AuthContext";
import { ShareContext } from "../../../util/ShareContext";

export const ListActions = ({ handleClose, commentType, id, tmsId, header, onCopyLink }) => {
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig();
  const isAuth = useContext(AuthContext);
  const { openShare, setOpenShare } = useContext(ShareContext);

  const baseUrl = publicRuntimeConfig.API_ENV === 'development' ? TV_TALK_HOST_LOCAL : TV_TALK_HOST;
  const copyLink = header ? `${baseUrl}${router.asPath}` : `${baseUrl}${router.asPath}#${id}`
  
  const toggleShare = () => setOpenShare(!openShare)
  const handleShareClose = (event) => {
    handleClose(event)
    toggleShare()
  }
  const handleCopyLink = async (event) => {
    await copyToClipboard(copyLink);
    handleClose(event)
    if (onCopyLink) onCopyLink();
  }
  const handleUnfollow = async (event) => {
    // Todo: find api endpoint to change the status of following
    if (isAuth) {
      console.log('you can unfollow', id)
    }
    handleClose(event)
  }

  return (
    <>
      <MenuItem onClick={handleShareClose} disableRipple>
        <ShareIcon />
        Share to...
      </MenuItem>
      <MenuItem onClick={handleCopyLink} disableRipple>
        <AttachmentIcon />
        Copy Link
      </MenuItem>
      <Report handleClose={handleClose} id={id} commentType={commentType} />
      <MenuItem onClick={handleUnfollow} disableRipple disabled={!isAuth}>
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
    </>
  );
};