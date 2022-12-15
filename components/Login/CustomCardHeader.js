import { CardHeader, Typography, Stack, Link } from "@mui/material";

export const CustomCardHeader = ({title, subheader, subheaderLink, subheaderLinkTitle, isMobile, ...props}) => {
  return(
    <CardHeader
      {...props}
      title={
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: isMobile ? '2.25rem' : '2.5rem'
        }}>
          {title}
      </Typography>}
      subheaderTypographyProps={{ fontSize: isMobile ? '1.125rem' : '1.25rem' }}
      subheader={
        <Stack direction='row' spacing={1} justifyContent='center' alignItems='baseline' sx={{marginTop: 0.75}}>
          <span>{subheader}</span>
          <Link href={subheaderLink} underline="none" color='primary'>{subheaderLinkTitle}</Link>
        </Stack>
      }
    />
  )

}