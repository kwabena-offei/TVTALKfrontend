import { styled } from "@mui/system";
import { Box, Typography, Stack, Container, CardHeader, CardContent, IconButton } from "@mui/material";
import { OutlinedButton } from "../OutlinedButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from 'next/router';

const BUTTON_WIDTH = "115px";

export const SectionTitle = ({ title }) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" spacing={2} sx={{ my: isMobile ? 2 : 5 }}>
        {isMobile ? <ButtonBackMobile onClick={() => router.push('/profile')} /> : <ButtonBack onClick={() => router.push('/profile/reactions')} />}
        <Box sx={{ width: "100%", padding: 0, paddingRight: isMobile ? 0 : BUTTON_WIDTH }}>
          { isMobile ? <MobileTitle>{title}</MobileTitle> : <DescktopTitle>{title}</DescktopTitle> }
        </Box>
      </Stack>
    </Container>
  );
};

export const MobileTitle = ({children}) => (
  <Typography component='h1' fontWeight={600} fontSize={24} textAlign='start'>
    {children}
  </Typography>
)

export const DescktopTitle = ({children}) => (
  <Typography component='h1' fontWeight={700} fontSize={48} textAlign='center'>
    {children}
  </Typography>
)

export const SectionSubtitle = ({ subtitle }) => {
  return (
    <CardHeader
      title={subtitle}
      titleTypographyProps={{
        textAlign: "center",
        fontWeight: 700,
        fontSize: "32px",
        lineHeight: "120%",
      }}
    />
  );
};


export const SectionSubtitleMobile = ({ subtitle }) => {
  return (
    <CardHeader
      title={subtitle}
      titleTypographyProps={{
        textAlign: "center",
        fontWeight: 700,
        fontSize: '1.25rem',
        lineHeight: "120%",
      }}
    />
  );
};

export const ButtonBack = ({ ...props }) => {
  return (
    <Box>
      <OutlinedButton
        sx={{
          fontWeight: 600,
          lineHeight: "18px",
          fontSize: "16px",
          width: BUTTON_WIDTH,
          height: "50px",
        }}
        startIcon={<ChevronLeftRoundedIcon fontSize="inherit" />}
        {...props}
      >
        Back
      </OutlinedButton>
    </Box>
  );
};

export const ButtonBackMobile = ({ ...props }) => {
const RoundedButton = styled(IconButton, {
  name: 'IconButton',
  slot: "custom-styled"
}) ({
  width: '36px',
  height: '36px',
  border: '1px solid #131B3F',
  color: '#EFF2FD',
  fontSize: '1.25rem'
})
  return (
    <Box width={36} height={36}>
      <RoundedButton
        variant='outlined'
        {...props}
      >
        <ChevronLeftRoundedIcon fontSize="inherit" />
      </RoundedButton>
    </Box>
  );
};
// Terms | Policy | Feedback -- text variants
export const CasualText = ({ children }) => (
  <Typography
    color="text.secondary"
    variant="body1"
    sx={{ fontWeight: 400, lineHeight: "180%" }}
  >
    {children}
  </Typography>
);

export const CasualTextMobile = ({ children }) => (
  <Typography
    color="text.secondary"
    variant="body1"
    sx={{ fontWeight: 400, lineHeight: "180%", fontSize: '0.875rem' }}
  >
    {children}
  </Typography>
);

export const SecondaryText = ({ children }) => (
  <Typography
    color="text.secondary"
    sx={{ fontSize: '1.125rem',fontWeight: 600, lineHeight: "180%" }}
  >
    {children}
  </Typography>
);

export const SecondaryTextMobile = ({ children }) => (
  <Typography
    color="text.secondary"
    sx={{ fontSize: '1rem',fontWeight: 600, lineHeight: "180%" }}
  >
    {children}
  </Typography>
);

export const SubtitleHeader = ({ children }) => (
  <Typography
    variant="h6"
    color="text.primary"
    sx={{ fontWeight: 600, lineHeight: "180%" }}
  >
    {children}
  </Typography>
);

export const SubtitleHeaderMobile = ({ children }) => (
  <Typography
    variant="h6"
    color="text.primary"
    sx={{ fontWeight: 600, fontSize: '1.125rem', lineHeight: "180%" }}
  >
    {children}
  </Typography>
);

export const StyledCardText = ({children}) => {
  return(
    <CardContent sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      gap: '20px'
    }}>{children}</CardContent>
  )
}
