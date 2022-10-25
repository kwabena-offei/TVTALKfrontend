import React from "react";
import { FilledInput, InputLabel, Stack } from "@mui/material";
// import { styled } from "@mui/system";

export const FormInput = (props) => {
  return (
    <Stack direction='column' spacing={1}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <FilledInput
        {...props}
        id={props.id}
        disableUnderline
        fullWidth
      />
    </Stack>
  )
}