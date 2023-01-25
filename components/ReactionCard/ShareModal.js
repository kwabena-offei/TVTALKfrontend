import { Box, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share';
export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    minWidth: '300px',
    borderRadius: "6px",
    backgroundImage: "none"
  },
  "& .MuiDialogTitle-root": {
    textAlign: "center",
    fontWeight: 600
  },
  "& .MuiDialogContentText-root": {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '180%',
    color: theme.palette.text.primary
  }
}));

export const ShareModal = ({ open, onClose, url, quote }) => {
  return (
    <StyledDialog open={open} onClose={onClose} keepMounted={false} >
      <DialogTitle>Share to...</DialogTitle>
      <DialogContent>
        <Stack direction="row" justifyContent='space-around'>
          <Box justifyContent='center' display='flex' flexDirection='column'>
            <FacebookShareButton
              url={url}
              quote={quote}
              hashtag={"#tv_talk"}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <Typography>Facebook</Typography>
          </Box>
          <Box justifyContent='center' display='flex' flexDirection='column'>
            <TwitterShareButton url={url} title={quote} hashtags={['tv_talk', 'shows']}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <Typography>Twitter</Typography>
          </Box>
        </Stack>
      </DialogContent>
    </StyledDialog>
  );
};
