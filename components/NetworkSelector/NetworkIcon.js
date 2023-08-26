import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import streaming from "./streaming.json";
import { useState } from "react";
import Link from "next/link";

const NetworkIcon = ({ network, isActive, type }) => {
  const { assetName } = network;
  const [isHovered, setIsHovered] = useState(false);
  const assetURL = isHovered || isActive ? `/assets/networks/${assetName}.svg` : `/assets/networks/${assetName}-Inactive.svg`;

  let url;

  switch (type) {
    case 'network':
      url = `/guide/network/${network.stationId}`;
      break;
    case 'streaming':
      url = `/guide/network/${network.slug}`;
      break;
    case 'other':
      url = network.slug === 'everything' ? '/' : '/guide/live'
      break;
  }

  return (
    <div key={assetName} style={{ width: 178, height: 80 }}>
      <Link href={url}><img
        src={assetURL}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      /></Link>
    </div>
  )
}

export default NetworkIcon;