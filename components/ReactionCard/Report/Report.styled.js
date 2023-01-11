import { NavigateNextRounded } from "@mui/icons-material";
import { Typography, Box, IconButton, DialogTitle, Dialog, ListItemButton, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "../../Icons/ArrowBackIcon";
import PrimaryButton from "../../PrimaryButton";

const BUTTON_SIZE = "2em";

export const StyledDialog = styled(
  Dialog,
  {}
)({
  "& .MuiDialog-paper": {
    minWidth: 320,
    maxWidth: 685,
    borderRadius: "6px",
    backgroundImage: "none",
    padding: "20px 30px",
    ["@media (max-width:780px)"]: {
      padding: '15px 20px',
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
  "& .MuiDialogContentText-root": {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '180%'
  }
});


export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  lineHeight: "120%",
  fontWeight: 500,
  margin: 0,
  color: theme.palette.text.primary,
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  lineHeight: "1.125rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  textAlign: "center",
  marginBottom: '0.5em',
  ["@media (max-width:780px)"]: {
    fontSize: "0.875rem",
    lineHeight: "1rem",
    marginBottom: '0.3em',
  },
}));

export const StyledArrowButton = styled(IconButton)(({ theme }) => ({
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  color: theme.palette.text.secondary,
  fontSize: "1rem",
  position: "absolute",
  padding: 5,
  top: "1em",
  left: "1.125em",
  ["@media (max-width:780px)"]: {
    top: 15,
    left: 10,
  },
}));

export const ReportTitle = ({ onClick }) => {
  return (
    <Box>
      <BackArrow onClick={onClick} />
      <DialogTitle>Report</DialogTitle>
    </Box>
  );
};

export const BackArrow = (props) => {
  return (
    <StyledArrowButton aria-label="return" {...props}>
      <ArrowBackIcon fontSize="inherit" />
    </StyledArrowButton>
  );
};

export const ReportStep = ({ text, ...props }) => {
  return (
    <ListItemButton disableRipple {...props}>
      {text}
      <IconButton sx={{marginLeft: 'auto', alignSelf: 'flex-start', padding: 0}} color='primary'><NavigateNextRounded/></IconButton>
    </ListItemButton>
  )
}

export const FinalStep = ({ text, onClick }) => {
  return (
    <>
      <DialogContent>
        <DialogContentText sx={{ whiteSpace: 'pre-line' }}>{text}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <PrimaryButton onClick={onClick}>Done</PrimaryButton>
      </DialogActions>
    </>
  );
}