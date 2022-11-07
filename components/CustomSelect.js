import React from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import styles from './CustomSelect.module.scss';

const StyledSelect = styled(Select, {})({
    backgroundColor: '#131B3F',
    height: '50px',
    borderRadius: '38px',
    borderWidth: '1.5px',
    borderColor: '#131B3F',
    padding: '12px 30px',
})

const StyledInputLabel = styled(InputLabel, {})({
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '26px',
    color: '#EFF2FD',
    left: '15px',
    top: '-5px',
})

const CustomSelect = props => {

    const { selectList, label, labelId, selectId, handleChange } = props;

    return (
        <FormControl
            fullWidth
         >
            <StyledInputLabel 
                id={labelId}
                sx={{
                    '&.Mui-focused': {
                        left: '-5px',
                    }
                  }}
            >
                {label}
            </StyledInputLabel>
            <StyledSelect
                labelId={labelId}
                id={selectId}
                label={label}
                onChange={handleChange}
                sx={{
                    '& .MuiSelect-icon': {
                      color: '#3361FF',
                      width: '22px',
                      height: '22px',
                      top: 'calc(50% - 11px)',
                    },
                  }}
                MenuProps={{ classes: { paper: styles.paper} }}
            >
                {selectList.map((item, index) => (
                    <MenuItem
                        key={index}
                        sx={{color: '#EFF2FD', fontSize: '16px'}}
                    >
                        {item}
                    </MenuItem>
                ) )}
            </StyledSelect>
        </FormControl>  
    );
};


export default CustomSelect;