import IconButton from '@mui/material/IconButton';
import { styled } from "@mui/system";

const RoundedButton = styled(IconButton, {
  name: 'IconButton',
  slot: "custom-styled"
}) ({
  backgroundColor: '#090F27',
  color: "#A5B0D6",
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  gap: '8px'
})

const RoundedIconButton = ({icon, ...props}) => {
  return (
    <RoundedButton {...props}>
      {icon}
    </RoundedButton>
  )
}

export default RoundedIconButton;