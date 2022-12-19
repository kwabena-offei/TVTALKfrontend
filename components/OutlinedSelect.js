import React from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { styled } from "@mui/system";

const StyledInputLabel = styled(InputLabel, {})({
  fontWeight: 400,
  fontSize: '1rem',
  lineHeight: '1em',
  color: '#eff2fd',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  '&.MuiFormLabel-root': {
    '&.MuiInputLabel-root': {
    '&.Mui-focused': {
      paddingLeft: 0,
      paddingRight: 0,
    },
    '&.MuiFormLabel-filled': {
      paddingLeft: 0,
      paddingRight: 0,
    }
  }}
})

const StyledOutlinedSelect = styled(Select, {}) ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#131B3F',
  }
})
const OutlinedSelect = (props) => {
  const { selectList, label, id, value, handleChange } = props;
  return (
    <FormControl fullWidth>
      <StyledInputLabel
        id={`${id}-label`}
        color='neutral'>
          {label}
        </StyledInputLabel>
      <StyledOutlinedSelect
        variant='outlined'
        label={label}
        color='neutral'
        labelId={`${id}-label`}
        id={id}
        value={value}
        sx={{ paddingX: '1rem', height: '50px', '.MuiSvgIcon-root ': {
          marginRight: '1rem',
        }}}
        onChange={handleChange}
      >
        {selectList.map((item, index) => (
          <MenuItem key={`${item}-${index}`} value={item} sx={{ color: 'text.primary', fontSize: "1rem" }}>
            {item}
          </MenuItem>
        ))}
      </StyledOutlinedSelect>
    </FormControl>
  );
};

export default OutlinedSelect;
