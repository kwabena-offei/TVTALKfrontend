import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button, {
  name: "Custom", // Changes class name in the DOM
  slot: "outlined", // appends slot name to the name above in the DOM
})({
  backgroundColor: "#090F27",
  borderRadius: 25,
  border: "1px solid #131B3F",
  "&:hover": {
    backgroundColor: "#131B3F",
    border: "1px solid #131B3F",
  },
});

export const OutlinedButton = (props) => {
  const { children } = props;
  return (
    <StyledButton variant="outlined" color="neutral" {...props}>
      {children}
    </StyledButton>
  );
};
