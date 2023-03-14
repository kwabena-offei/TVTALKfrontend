import React, { useState, useContext } from "react";
import { MenuItem } from "@mui/material";
import ReportIcon from "../../Icons/ReportIcon";
import { StyledDialog } from "./Report.styled";
import ReportSteps from "./ReportSteps";
import { useRouter } from "next/router";
import { AuthContext } from "../../../util/AuthContext";

const Report = ({ handleClose, id, commentType }) => {
  const isAuth = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseModal = (event) => {
    setOpen(false);
    handleClose(event);
  };
  const url = useRouter().asPath

  return (
    <>
      <MenuItem onClick={handleOpen} disableRipple disabled={!isAuth}>
        <ReportIcon />
        Report
      </MenuItem>
      <StyledDialog open={open} onClose={handleCloseModal} fullWidth>
        <ReportSteps id={id} commentType={commentType} url={url} onClose={handleCloseModal}/>
      </StyledDialog>
    </>
  );
};

export default Report;
