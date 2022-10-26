import React from "react";
import { FilledInput, FormHelperText, InputLabel, Stack } from "@mui/material";

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
      {!!props.helpertext && 
        <FormHelperText
        >
          {props.helpertext}
        </FormHelperText>
      }
    </Stack>
  )
}