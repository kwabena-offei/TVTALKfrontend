import { Button } from '@mui/material';
import { styled } from "@mui/system";

const RoundedButton = styled(Button, {
  name: "Favorite",
  slot: "dark-button"
}) ({
  backgroundColor: '#090F27',
  color: "#A5B0D6",
  paddingLeft: '1.15vw',
  paddingRight: '1.15vw',
  boxShadow: 'none'
})

const DarkRoundedTextButton = ({children, ...props}) => {
  return (
    <RoundedButton variant='contained' {...props}>
      {children}
    </RoundedButton>
  )
}

export default DarkRoundedTextButton;