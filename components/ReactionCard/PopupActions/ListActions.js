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
import { ShareModal } from "../ShareModal";
import { ShareDrawer } from "../ShareDrawer";

export const ListActions = ({ handleClose, commentType, id, tmsId, header, isMobile }) => {
  const [openShare, setOpenShare] = useState(false)
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig();
  const isAuth = useContext(AuthContext);

  const baseUrl = publicRuntimeConfig.API_ENV === 'development' ? TV_TALK_HOST_LOCAL : TV_TALK_HOST;
  const copyLink = header ? `${baseUrl}${router.asPath}` : `${baseUrl}${router.asPath}#${id}`
  const quote = 'Look what we got here on TV_Talk!'
  const toggleShare = () => setOpenShare(!openShare)
  const handleShare = async (event) => {
    // Todo: add share logic
    // handleClose(event)
    toggleShare()
  }
  const handleCopyLink = async (event) => {
    await copyToClipboard(copyLink);
    handleClose(event)
  }
  const handleUnfollow = async (event) => {
    // Todo: find api endpoint to change the status of following
    if (isAuth) {
      console.log('you can do this')
    }
    handleClose(event)
  }

  return (
    <>
      <MenuItem onClick={handleShare} disableRipple>
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
      { isMobile ? (
        <ShareDrawer
          open={openShare}
          onClose={toggleShare}
          quote={quote}
          url={copyLink}
        />
      ) : (
        <ShareModal
          open={openShare}
          onClose={toggleShare}
          quote={quote}
          url={copyLink}
        />
      )}
    </>
  );
};