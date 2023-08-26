import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import streaming from "./streaming.json";
import networks from "./networks.json";
import { useState } from "react";

const ChannelSelector = () => {
  const allNetworks = streaming.concat(networks);
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
            {allNetworks.map(({ assetName }) => {
              return <div key={assetName} style={{ width: 178, height: 80 }}>
                <img src={`assets/networks/assets/${assetName}.svg`} />
              </div>
            })}
          </section>
        </AccordionDetails>
      </Accordion>

      <div style={{ textAlign: 'center' }}>
        <Button style={{ color: '#FFF' }} variant='outlined' onClick={() => { setIsExpanded(!isExpanded) }}>{isExpanded ? 'Hide' : 'Show All'}</Button>
      </div>
    </div>
  )
}

export default ChannelSelector;