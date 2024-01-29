import { Button } from '@mui/material';
import { styled } from "@mui/system";

const RoundedButton = styled(Button, {
  name: 'OutlinedIconButton',
  slot: "custom-styled"
}) ({
  border: '1px solid #131B3F',
  color: '#A5B0D6',
  borderRadius: '50%',
  minWidth: '50px',
  minHeight: '50px',
  padding: '5px',
  boxShadow: 'none',
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  },
  ['@media (max-width:780px)'] : {
    minWidth: "40px",
    minHeight: "40px",
    '& .MuiSvgIcon-root': {
      fontSize: '1.25rem',
    }
  }
})

const OutlinedRoundIconButton = ({icon, ...props}) => {
  return (
    <RoundedButton variant='outlined' {...props}>
      {icon}
    </RoundedButton>
  )
}

export default OutlinedRoundIconButton;