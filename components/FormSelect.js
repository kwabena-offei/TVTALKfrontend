import React from "react";
import { Select, InputLabel, Stack, FormHelperText } from "@mui/material";
// import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { styled } from "@mui/system";


export const FormSelect = ({inputProps, ...props}) => {
  return (
    <Stack direction='column' spacing={1}>
      <InputLabel htmlFor={props.id} sx={{color: "#EFF2FD"}}>{props.label}</InputLabel>
      <Select
        sx={{
          borderRadius: 30,
          backgroundColor: '#131B3F',
        }}
        variant='filled'
        {...props}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span>{props?.placeholder}</span>;
          }

          return selected
        }}
        id={props.id}
        // IconComponent={() => <KeyboardArrowDownRoundedIcon color="primary" sx={{marginRight: '1.5vw'}}/>}
        disableUnderline
        fullWidth
      >{props.children}</Select>
      {inputProps.helperText && <FormHelperText>{inputProps.helperText}</FormHelperText>}
    </Stack>
  )
}