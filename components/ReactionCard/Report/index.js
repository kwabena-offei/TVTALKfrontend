import React, { useState, useRef } from "react";
import { Dialog, DialogContent, MenuItem, styled, Box } from "@mui/material";
import ReportIcon from "../../Icons/ReportIcon";
import { ReportTitle, Subtitle } from "./Report.styled";
import ReportSteps from "./ReportSteps";
import { useRouter } from "next/router";
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from "@mui/material/useMediaQuery";

const StyledDialog = styled(
  Dialog,
  {}
)({
  "& .MuiDialog-paper": {
    minWidth: 320,
    maxWidth: 685,
    borderRadius: "6px",
    backgroundImage: "none",
    padding: "1em 1.125em",
    ["@media (max-width:780px)"]: {
      padding: "0.625em 1em",
      margin: 1.75,
    },
  },
  "& .MuiDialogTitle-root": {
    textAlign: "center",
    padding: 0,
  },
  "& .MuiDialogContent-root": {
    padding: 0,
  },
});

const Report = ({ handleClose, id }) => {
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
      <Box>
        <ReportTitle onClick={handleCloseModal}/>
        <Subtitle>Why are you reporting this account?</Subtitle>
      </Box>
        <DialogContent>
          <ReportSteps id={id} url={url}/>
        </DialogContent>
      </StyledDialog>
    </>
  );
};

export default Report;
