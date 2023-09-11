import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import streaming from "./streaming.json";
import networks from "./networks.json";
import NetworkIcon from "./NetworkIcon";
import { useState } from "react";
import { styled } from '@mui/system';

const NetworkSelector = ({ activeNetwork }) => {
  const StyledTile = styled(NetworkIcon)({
    scrollSnapAlign: 'start',
  });

  const otherTiles = [{
    title: 'Everything',
    assetName: 'everything',
    slug: 'everything',
    path: '/',
  }, {
    title: 'Live',
    assetName: 'live',
    slug: 'live',
    path: '/guide/live'
  }].map((network) => {
    return <StyledTile key={network.slug} type='other' network={network} isActive={(network.slug) === activeNetwork?.toLowerCase()} />
  })

  const streamingTiles = streaming.map((network) => {
    return <StyledTile key={network.slug} type='streaming' network={network} isActive={(network.slug) === activeNetwork?.toLowerCase()} />
  })

  const networkTiles = networks.map((network) => {
    return <StyledTile key={network.stationId} type='network' network={network} isActive={(network.stationId) === activeNetwork?.toLowerCase()} />
  })

  let tiles = otherTiles.concat(streamingTiles).concat(networkTiles)
  // tiles = tiles.sort((a, b) => (a.slug === activeNetwork ? -1 : b.slug === activeNetwork ? 1 : 0));

  const [isExpanded, setIsExpanded] = useState(false);

  const TileWrapper = styled('div')(({ expanded }) => ({
    display: 'flex',
    gap: '15px',
    overflowX: expanded ? 'hidden' : 'auto',
    flexWrap: expanded ? 'wrap' : 'nowrap',
    overflowY: 'hidden',
    scrollSnapType: 'x mandatory',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    msOverflowStyle: 'none',
    '& > div': {
      scrollSnapAlign: 'start',
    },
    ...(expanded && {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
    }),
    '@media (max-width: 900px)': {
      // Adjust styles for mobile if necessary
    },
  }));


  return (
    <div>
      <Accordion
        expanded={isExpanded}
        sx={{
          boxShadow: 'none',
          padding: 0,
          '& .MuiCollapse-root': {
            minHeight: '100px !important',
            visibility: 'visible !important'
          },
          '& .MuiAccordion-root': {
            backgroundColor: 'red !important'
          }
        }} style={{ background: 'none' }} >
        <AccordionSummary
          style={{ padding: 0 }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <TileWrapper expanded={isExpanded}>
            {tiles}
          </TileWrapper>
        </AccordionDetails>
      </Accordion>

      <div style={{ textAlign: 'center' }}>
        <Button style={{ color: '#FFF' }} variant='outlined' onClick={() => { setIsExpanded(!isExpanded) }}>{isExpanded ? 'Close All' : 'Show All'}</Button>
      </div>
    </div>
  )
}

export default NetworkSelector;