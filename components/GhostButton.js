import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button, {
  name: "Custom", // Changes class name in the DOM
  slot: "ghost", // appends slot name to the name above in the DOM
})({
  backgroundColor: "transparent",
  borderRadius: 25,
  border: "1.5px solid #131B3F",
  "&:hover": {
    border: "1.5px solid #131B3F"
  },
});

export const GhostButton = (props) => {
  const { children } = props;
  return (
    <StyledButton variant="outlined" color='secondary' {...props}>
      {children}
    </StyledButton>
  );
};
