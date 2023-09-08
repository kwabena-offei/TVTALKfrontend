import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import streaming from "./streaming.json";
import networks from "./networks.json";
import NetworkIcon from "./NetworkIcon";
import { useState } from "react";

const NetworkSelector = ({ activeNetwork }) => {

  const otherTiles = [{
    title: 'Everything',
    assetName: 'everything',
    slug: 'Everything',
    path: '/',
  }, {
    title: 'Live',
    assetName: 'live',
    slug: 'Live',
    path: '/guide/live'
  }].map((network) => {
    return <NetworkIcon key={network.slug} type='other' network={network} isActive={(network.slug) === activeNetwork?.toLowerCase()} />
  })

  const streamingTiles = streaming.map((network) => {
    return <NetworkIcon key={network.slug} type='streaming' network={network} isActive={(network.slug) === activeNetwork?.toLowerCase()} />
  })

  const networkTiles = networks.map((network) => {
    return <NetworkIcon key={network.stationId} type='network' network={network} isActive={(network.stationId) === activeNetwork?.toLowerCase()} />
  })

  const tiles = otherTiles.concat(streamingTiles).concat(networkTiles)

  // const allNetworks = streaming.concat(networks);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <Accordion
        expanded={isExpanded}
        sx={{
          boxShadow: 'none',
          padding: 0,
          '& .MuiCollapse-root': {
            minHeight: '200px !important',
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
          <section style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            {tiles}
          </section>
        </AccordionDetails>
      </Accordion>

      <div style={{ textAlign: 'center' }}>
        <Button style={{ color: '#FFF' }} variant='outlined' onClick={() => { setIsExpanded(!isExpanded) }}>{isExpanded ? 'Close All' : 'Show All'}</Button>
      </div>
    </div>
  )
}

export default NetworkSelector;