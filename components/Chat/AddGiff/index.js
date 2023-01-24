import {
  Grid,
  SearchBar,
  SearchContext,
  SearchContextManager,
  SuggestionBar
} from "@giphy/react-components";
import { useContext } from "react";
import getConfig from 'next/config';
import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material";
import { StyledDialog } from "../../ReactionCard/Report/Report.styled";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from './gifs.module.css'

export default function SearchGif({ gifs, open, handleClose, onGifClick }) {
  const { publicRuntimeConfig } = getConfig();
  const apiKey = publicRuntimeConfig.GIPHY_API_KEY

  return (
    <SearchContextManager
      apiKey={apiKey}
      // shouldDefaultToTrending={false}
    >
      <Components open={open} handleClose={handleClose} onGifClick={onGifClick} />
    </SearchContextManager>
  );
}

const Components = ({ open, handleClose, onGifClick }) => {
  const { fetchGifs, term, channelSearch, activeChannel } = useContext(
    SearchContext
  );
  const theme = useTheme()
  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      scroll='paper'
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth
      maxWidth='md'
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DialogTitle>
            Add Giff to your post
          </DialogTitle>
          <SearchBar className={styles.search} />
          {/* <SuggestionBar className={styles.channels} /> */}
        </Box>
        
      <DialogContent sx={{
        height: '50vh'
      }}>
        <Grid
          noLink
          className={styles.grid}
          onGifClick={onGifClick}
          key={`${channelSearch} ${term} ${activeChannel?.user.username}`}
          columns={600 < 200 ? 2 : 3}
          width={600}
          fetchGifs={fetchGifs}
          // className={classNames.grid}
          // columns={3}
          gutter={6}
          hideAttribution
          // overlay={function Overlay(_ref){var gif=_ref.gif,isHovered=_ref.isHovered;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)(OverlayContainer,{children:isHovered?gif.id:""})}}
        />
      </DialogContent>
    </StyledDialog>
  );
};
