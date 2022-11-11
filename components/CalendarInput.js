import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import React from "react";
import { InputLabel, Stack, TextField } from "@mui/material";

export const CalendarInput = ({
  id,
  children,
  name,
  value,
  onChange,
  inputFormat,
  inputProps,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        {...props}
        name={name}
        inputFormat={inputFormat}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <Stack direction="column" spacing={1}>
            <InputLabel htmlFor={id}>{children}</InputLabel>
            <TextField {...params} {...inputProps} id={id} />
          </Stack>
        )}
      />
    </LocalizationProvider>
  );
};
