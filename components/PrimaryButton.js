import { Button } from "@mui/material"
import { styled } from "@mui/system"

const StyledButton = styled(Button) ({
  boxShadow: 'none',
  padding: '1em 2em',
  fontSize: '1rem',
  lineHeight: '1.125rem',
  fontWeight: 600,
  fontFeatureSettings: `'calt' off`,
  ["@media (max-width:780px)"]: {
    padding: '0.6875em 1.375em',
    fontSize: '0.875rem',
  }
})

const PrimaryButton = ({children, ...props}) => {
  return (
    <StyledButton
      variant='contained'
      color='primary'
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export default PrimaryButton;