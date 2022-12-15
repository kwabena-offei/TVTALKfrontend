import React from "react";
import { TextField, InputLabel, Stack } from "@mui/material";

export const FormInput = ({ children, id, label, ...props }) => {
  return (
    <Stack direction="column" spacing={1.125}>
      <InputLabel sx={{color: "#EFF2FD"}} htmlFor={id}>{label}</InputLabel>
      <TextField
        {...props}
        id={id}
        fullWidth
        variant="filled"
        // FormHelperTextProps={{ sx: { color: 'red'} }}
      >
        {children}
      </TextField>
    </Stack>
  );
};
