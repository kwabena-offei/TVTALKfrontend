import { styled } from "@mui/system";
import { Box, Avatar, Typography, Stack, Button, Container, Grid } from "@mui/material";
import { OutlinedButton } from "../OutlinedButton";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

export const SectionTitle = ({ title }) => {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
      >
        <ButtonBack />
        <Box sx={{ width: '100%', padding: 0, paddingRight: '115px' }}>
          <Typography fontWeight={700} fontSize={48} textAlign='center'>
            {title}
          </Typography>
        </Box>
      </Stack>  
    </Container>
  )
}
export const ButtonBack = ({...props}) => {
  return (
    <Box>
      <OutlinedButton
        sx={{
          fontWeight: 600,
          lineHeight: '18px',
          fontSize: '16px',
          width: '115px',
          height: '50px',
        }}
        startIcon={<ChevronLeftRoundedIcon fontSize="inherit" />}
        {...props}>
          Back
      </OutlinedButton>
    </Box>
  )
}