import React from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { styled } from "@mui/system";

const StyledInputLabel = styled(InputLabel, {})({
  fontWeight: 400,
  fontSize: '1rem',
  lineHeight: '1em',
  color: '#eff2fd',
  paddingLeft: '1em',
  paddingRight: '1em',
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
    }
  }
})

const StyledOutlinedSelect = styled(Select, {})({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#131B3F',
  }
})
const OutlinedSelect = (props) => {
  console.log({ props })
  const { selectList, label, id, value, handleChange } = props;
  return (
    <FormControl fullWidth style={{marginBottom: '20px'}}>
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
        sx={{
          paddingX: '1em', height: '50px', '.MuiSvgIcon-root ': {
            marginRight: '1em',
          }
        }}
        onChange={handleChange}
      >
        {selectList.map((item, index) => (
          <MenuItem key={`${item}-${index}`} value={item.value} sx={{ color: 'text.primary', fontSize: "1rem" }}>
            {item.label}
          </MenuItem>
        ))}
      </StyledOutlinedSelect>
    </FormControl>
  );
};

export default OutlinedSelect;
