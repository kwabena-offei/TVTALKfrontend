import {
  Grid,
  SearchBar,
  SearchContext,
  SearchContextManager,
  SuggestionBar
} from "@giphy/react-components";
import { useContext } from "react";
import getConfig from 'next/config';
import { Dialog, DialogContent } from "@mui/material";

export default function SearchGif({ gifs, open, handleClose }) {
  const { publicRuntimeConfig } = getConfig();
  const apiKey = publicRuntimeConfig.GIPHY_API_KEY

  return (
    <SearchContextManager apiKey={apiKey}>
      <Components open={open} handleClose={handleClose}/>
    </SearchContextManager>
  );
}

const Components = ({open, handleClose}) => {
  const { fetchGifs, term, channelSearch, activeChannel } = useContext(
    SearchContext
  );
  const classNames = {
    search: 'search-gif-input',
    grid: 'gif-grid'
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll='body'
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogContent>
        <SearchBar className={classNames.search} />
        <SuggestionBar />
        <Grid
          noLink
          onGifClick={(obj) => {console.log('url', obj.url)}}
          key={`${channelSearch} ${term} ${activeChannel?.user.username}`}
          columns={400 < 200 ? 2 : 4}
          width={400}
          fetchGifs={fetchGifs}
          className={classNames.grid}
        />
      </DialogContent>
    </Dialog>
  );
};
