import {
  Grid,
  SearchBar,
  SearchContext,
  SearchContextManager
} from "@giphy/react-components";
import { useContext } from "react";
import getConfig from 'next/config';
import { DialogContent, DialogTitle, Box } from "@mui/material";
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      scroll='paper'
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth='md'
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DialogTitle>
            Add Giff to your post
          </DialogTitle>
          <SearchBar className={styles.search} />
        </Box>
        
      <DialogContent sx={{
        height: '50vh'
      }}>
        <Grid
          noLink
          useTransform
          className={styles.grid}
          onGifClick={onGifClick}
          key={`${channelSearch} ${term} ${activeChannel?.user.username}`}
          columns={isMobile ? 3 : 4}
          width={isMobile ? 300 : 540}
          fetchGifs={fetchGifs}
          // className={classNames.grid}
          gutter={6}
          hideAttribution
        />
      </DialogContent>
    </StyledDialog>
  );
};
