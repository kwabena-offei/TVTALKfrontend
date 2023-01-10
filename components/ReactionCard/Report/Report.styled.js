import { NavigateNextRounded } from "@mui/icons-material";
import { Typography, Box, IconButton, DialogTitle, Button, ListItem, ListItemButton, DialogContent, DialogContentText } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "../../Icons/ArrowBackIcon";

const BUTTON_SIZE = "2em";

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
  ["@media (max-width:780px)"]: {
    fontSize: "0.875rem",
    lineHeight: "1rem",
  },
}));

export const StyledArrowButton = styled(IconButton)(({ theme }) => ({
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  color: theme.palette.text.secondary,
  fontSize: "1rem",
  position: "absolute",
  top: "1em",
  left: "1.125em",
  ["@media (max-width:780px)"]: {
    top: 10,
    left: 15,
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
    <ListItem {...props}>
      <ListItemButton disableRipple>
        {text}
        <IconButton sx={{marginLeft: 'auto'}} color='primary'><NavigateNextRounded/></IconButton>
      </ListItemButton>
    </ListItem>
  )
}

export const FinalStep = ({ text, onClick }) => {
  return (
    <DialogContent>
      <DialogContentText>{text}</DialogContentText>
      <Button onClick={onClick}>Done</Button>
    </DialogContent>
  )
}