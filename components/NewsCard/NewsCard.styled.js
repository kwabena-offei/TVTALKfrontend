import { styled } from "@mui/system";
import { Container, Typography, Card, CardActions, CardMedia, Box } from "@mui/material";

export const NewsMainContainer = styled(Container)({
  paddingLeft: '20px',
  paddingRight: '20px',
  ['@media (min-width: 600px)']: {
    paddingLeft: '30px',
    paddingRight: '30px'
  }
})

export const CardWrapper = styled(Card, {
  name: "News",
  slot: "custom-card",
})({
  backgroundColor: "#131B3F",
  borderRadius: "6px",
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const MediaNews = styled(CardMedia) ({
  height: 300,
  ['@media (max-width: 600px)']: {
    height: 205,
  }
})

export const StyledBox = styled(Box, {
  name: 'Source',
  slot: 'box'
}) ({
  background: "#636D92",
  borderRadius: "6px",
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  padding: '6px 12px',
  ['@media (max-width: 600px)']: {
    padding: '4px 10px',
  }
})

export const SourceBox = ({ children }) => (
  <StyledBox>
    <Typography sx={{
      fontSize: '0.874rem',
      lineHeight: '120%'
    }}>
      {children}
    </Typography>
  </StyledBox>
);

export const TitleNews = ({ children, isMobile, ...props }) => {
// isMobile ? mobileStyle : desktopStyle
  const StyledTypography = styled(Typography) ({
    fontSize: isMobile ? "1.125rem" : "1.375rem",
    fontWeight: 500,
    lineHeight: "140%",
    whiteSpace: 'break-spaces',
    paddingBottom: isMobile ? '6px' : '12px',
    fontFeatureSettings: `'calt' off`,
    color: '#EFF2FD',
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
  })

  return (
    <StyledTypography
      variant="h5"
    {...props}>
      {children}
    </StyledTypography>
  )
}
export const DescriptionNews = ({ children, isMobile, ...props }) => {
  const StyledTypography = styled(Typography) (({ theme }) => ({
    lineHeight: '160%',
    color: theme.palette.text.secondary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "4",
    WebkitBoxOrient: "vertical",
  }))
  return (
    <StyledTypography
      variant='body1'
      sx={{
        fontSize: isMobile ? '0.8125rem' : '1rem'
      }}
    >
      {children}
    </StyledTypography>
  )
}
