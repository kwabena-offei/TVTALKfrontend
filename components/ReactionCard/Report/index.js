import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  MenuItem,
  styled,
} from "@mui/material";
import ReportIcon from "../../Icons/ReportIcon";
import { ReportTitle } from "./Report.styled";

const StyledDialog = styled(
  Dialog,
  {}
)({
  "& .MuiDialog-paper": {
    minWidth: 320,
    bgcolor: "background.paper",
    borderRadius: "6px",
    backgroundImage: "none",
    padding: '1em 1.125em'
  },
  "& .MuiDialogTitle-root": {
    textAlign: "center",
  },
});

const Report = ({ handleClose, id, children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
    handleClose();
  };

  return (
    <>
      <MenuItem onClick={handleOpen} disableRipple>
        <ReportIcon />
        Report
      </MenuItem>
      <StyledDialog open={open} onClose={handleCloseModal}>
        <ReportTitle onClick={handleCloseModal} />
        <DialogContent>
          {children}
        </DialogContent>
      </StyledDialog>
    </>
  );
};

export default Report;
