import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import streaming from "./streaming.json";
import { useState } from "react";

const NetworkIcon = ({ network, isActive }) => {
  const { assetName } = network;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const assetURL = isHovered || isActive ? `assets/networks/${assetName}.svg` : `assets/networks/${assetName}-Inactive.svg`;

  return (
    <div key={assetName} style={{ width: 178, height: 80 }}>
      <img
        src={assetURL}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}

      />
    </div>
  )
}

export default NetworkIcon;