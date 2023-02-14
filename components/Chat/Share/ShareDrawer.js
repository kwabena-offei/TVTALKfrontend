import {
  Box,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Drawer,
} from "@mui/material";
import { QUOTE } from "../../../util/constants";
import { styled } from "@mui/material/styles";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    borderRadius: "6px 6px 0 0",
    backgroundImage: "none",
  },
  "& .MuiDialogTitle-root": {
    textAlign: "center",
    fontWeight: 600,
  },
}));

export const ShareDrawer = ({ open, onClose, url }) => {
  return (
    <StyledDrawer
      open={open}
      onClose={onClose}
      anchor="bottom"
      variant="temporary"
      ModalProps={{
        keepMounted: false,
      }}
    >
      <DialogTitle>Share to...</DialogTitle>
      <DialogContent sx={{ paddingBottom: 6 }}>
        <Stack direction="row" justifyContent="space-around">
          <Box justifyContent="center" display="flex" flexDirection="column">
            <FacebookShareButton url={url} quote={QUOTE} hashtag={"#tv_talk"}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <Typography>Facebook</Typography>
          </Box>
          <Box justifyContent="center" display="flex" flexDirection="column">
            <TwitterShareButton
              url={url}
              title={QUOTE}
              hashtags={["tv_talk", "shows"]}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <Typography>Twitter</Typography>
          </Box>
        </Stack>
      </DialogContent>
    </StyledDrawer>
  );
};
