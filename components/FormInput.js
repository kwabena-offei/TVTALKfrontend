import React from "react";
import { FilledInput, FormHelperText, InputLabel, Stack } from "@mui/material";

export const FormInput = ({ children, id, label, ...props }) => {
  return (
    <Stack direction='column' spacing={1}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <FilledInput
        {...props}
        id={id}
        disableUnderline
        fullWidth
      >{children}</FilledInput>
      {!!props.helpertext && 
        <FormHelperText
        >
          {props.helpertext}
        </FormHelperText>
      }
    </Stack>
  )
}