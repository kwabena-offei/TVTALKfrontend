import React, { useState } from "react";
import { FormControl, Select, MenuItem, InputLabel, useTheme, TextField } from "@mui/material";
import { styled } from "@mui/system";

const StyledInputLabel = styled(InputLabel, {})({
  fontWeight: 400,
  fontSize: '1rem',
  color: '#eff2fd'
})
const StyledSelect = styled(Select, {}) ({
  border: '1.5px solid #cacaca'
})

const OutlinedSelect = ({ label, id, selectList, ...props }) => {
  const theme = useTheme()
  const [selectValue, setSelectValue] = useState('');

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  return (
    <FormControl fullWidth>
      <StyledInputLabel id={`${id}-label`} color='secondary'>{label}</StyledInputLabel>
      <Select
        variant='outlined'
        label={label}
        color='secondary'
        labelId={`${id}-label`}
        id={id}
        value={selectValue}
        inputProps={{ border: "1.5px solid #eff2fd" }}
        onChange={handleChange}
      >
        {selectList.map((item, index) => (
          <MenuItem key={index} sx={{ color: theme.palette.text.primary, fontSize: "1rem" }}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default OutlinedSelect;
