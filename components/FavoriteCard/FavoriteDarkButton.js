import { Button } from '@mui/material';
import { styled } from "@mui/system";

const RoundedButton = styled(Button, {
  name: 'IconButton',
  slot: "custom-styled"
}) ({
  backgroundColor: '#090F27',
  color: "#A5B0D6",
  minWidth: '36px',
  minHeight: '36px',
  padding: '8px',
  borderRadius: '50%',
  boxShadow: 'none'
})

const SmallRoundedIconButton = ({icon, ...props}) => {
  return (
    <RoundedButton variant='contained' {...props}>
      {icon}
    </RoundedButton>
  )
}

export default SmallRoundedIconButton;