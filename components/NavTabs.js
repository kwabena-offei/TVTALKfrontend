import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export const NavTabs = (props) => {
  console.log('props', props)
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  console.log('value', value)
  const { children } = props;
  const tabs = children.map((child, index) => {
    const label = <Typography><b>{child.count | '0'}</b> {child.id}</Typography>
      return <Tab key={`${index}-${child.id}`} label={label} />
    })
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        variant="fullWidth"
        onChange={handleChange}
        value={value}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >{tabs}
      </Tabs>
    </Box>
  );
}