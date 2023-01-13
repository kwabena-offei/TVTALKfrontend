import React, { useState, useContext } from "react";
import { DialogContent, MenuItem } from "@mui/material";
import ReportIcon from "../../Icons/ReportIcon";
import { ReportTitle, StyledDialog } from "./Report.styled";
import ReportSteps from "./ReportSteps";
import { useRouter } from "next/router";
import { AuthContext } from "../../../util/AuthContext";
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from "@mui/material/useMediaQuery";

const Report = ({ handleClose, id, commentType }) => {
  const isAuth = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
    handleClose();
  };
  const url = useRouter().asPath

  return (
    <>
      <MenuItem onClick={handleOpen} disableRipple disabled={!isAuth}>
        <ReportIcon />
        Report
      </MenuItem>
      <StyledDialog open={open} onClose={handleCloseModal} fullWidth>
        {/* <ReportTitle onClick={handleCloseModal}/> */}
        {/* <DialogContent> */}
          <ReportSteps id={id} commentType={commentType} url={url} onClose={handleCloseModal}/>
        {/* </DialogContent> */}
      </StyledDialog>
    </>
  );
};

export default Report;
