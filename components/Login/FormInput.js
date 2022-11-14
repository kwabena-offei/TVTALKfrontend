import React from "react";
import { TextField, InputLabel, Stack } from "@mui/material";

export const FormInput = ({ children, id, label, ...props }) => {
  return (
    <Stack direction="column" spacing={1}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <TextField
        {...props}
        id={id}
        fullWidth
        variant="filled"
        FormHelperTextProps={{ sx: { marginRight: 0 } }}
      >
        {children}
      </TextField>
    </Stack>
  );
};
