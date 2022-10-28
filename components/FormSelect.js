import React from "react";
import { Select, InputLabel, Stack } from "@mui/material";
// import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { styled } from "@mui/system";

const StyledSelect = styled(Select, {
  name: "Custom", // Changes class name in the DOM
  slot: "select", // appends slot name to the name above in the DOM
})({
  borderRadius: 25,
});


export const FormSelect = (props) => {
  return (
    <Stack direction='column' spacing={1}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <StyledSelect
        variant='filled'
        {...props}
        id={props.id}
        // IconComponent={() => <KeyboardArrowDownRoundedIcon color="primary" sx={{marginRight: '1.5vw'}}/>}
        disableUnderline
        fullWidth
      >{props.children}</StyledSelect>
    </Stack>
  )
}