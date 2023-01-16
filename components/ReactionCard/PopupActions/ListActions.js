import React from "react";
import { MenuItem } from "@mui/material";
import AttachmentIcon from "../../Icons/AttachmentIcon";
import { CloseRounded } from "@mui/icons-material";
import ShareIcon from "../../Icons/ShareIcon";
import UnfollowIcon from "../../Icons/UnfollowIcon";
import Report from "../Report";
import { useRouter } from "next/router";
import Link from "next/link";

export const ListActions = ({ handleClose, commentType, id }) => {
  const router = useRouter()
  const { tmsId }= router.query
  const copyLink = `/chat/${tmsId}/comments/${id}/replies`

  const handleCopyLink = async () => {
    //Todo: decide how to create url for copy
    console.log('commentType', commentType, copyLink)
    // handleClose()
  }
  return (
    <>
      <MenuItem onClick={handleClose} disableRipple>
        <ShareIcon />
        Share to...
      </MenuItem>
      <MenuItem onClick={handleCopyLink} disableRipple>
        <AttachmentIcon />
        Copy Link
      </MenuItem>
      <Report handleClose={handleClose} id={id} commentType={commentType} />
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
      <MenuItem onClick={() => router.push(copyLink)}>reply</MenuItem>
    </>
  )
};