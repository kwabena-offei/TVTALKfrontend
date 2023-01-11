import React, { useState } from "react";
import { DialogContent, MenuItem } from "@mui/material";
import ReportIcon from "../../Icons/ReportIcon";
import { ReportTitle, StyledDialog } from "./Report.styled";
import ReportSteps from "./ReportSteps";
import { useRouter } from "next/router";
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from "@mui/material/useMediaQuery";

const Report = ({ handleClose, id, commentType }) => {
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
      <MenuItem onClick={handleOpen} disableRipple>
        <ReportIcon />
        Report
      </MenuItem>
      <StyledDialog open={open} onClose={handleCloseModal} fullWidth>
        <ReportTitle onClick={handleCloseModal}/>
        <DialogContent>
          <ReportSteps id={id} commentType={commentType} url={url}/>
        </DialogContent>
      </StyledDialog>
    </>
  );
};

export default Report;
