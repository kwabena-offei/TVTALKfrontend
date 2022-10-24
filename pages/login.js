import React from "react";
import { Box, TextField, Typography, Card, CardHeader, CardContent, Input } from "@mui/material";
// import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { styled } from "@mui/system";
import bg from "../public/assets/LoginBackground.jpg";
import { BackgroundPage } from '../components/BackgroundPage'

// const StyledBox = styled(Box, {
//   name: "Test", // Changes class name in the DOM
//   slot: "boxWrapper", // appends slot name to the name above in the DOM
// })({
//   background: "#090F27",
//   borderRadius: '6px',
//   height: "755px",
//   width: "620px",
//   marginTop: 82,
//   marginBottom: 83
// });

const StyledCard = styled(Card, {
  name: "Form", // Changes class name in the DOM
  slot: "login", // appends slot name to the name above in the DOM
})({
  background: "#090F27",
  borderRadius: '6px',
  height: "80%",
  width: "100%",
  marginTop: 82,
  marginBottom: 83,
  color: '#fff'
});
const StyledText = styled(
  Typography,
  {}
)({
  color: "#fff",
  fontWeight: 500,
  fontSize: "30px",
});
{/* <StyledText>Слава Україні</StyledText> */}

const login = (props) => {
  return (
    <>
        <BackgroundPage source={bg} alternative='main-bg' />
        <Box flexDirection='column' justifyContent='center' sx={{ marginLeft: '50%' }} >
            {/* <StyledBox
            component="form"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "evenly"
            }}>
                <StyledText>
                    Log In
                </StyledText>
            </StyledBox> */}
            <StyledCard>
                <CardHeader>Log In</CardHeader>
                <CardContent>
                    <TextField placeholder={<StyledText>example@mail.com</StyledText>}></TextField>
                    <Input variant="filled" type="password" placeholder="Enter Password" sx={{ color: '#fff!important'}}></Input>
                </CardContent>
            </StyledCard>

        </Box>
    </>
  );
};

export default login;
