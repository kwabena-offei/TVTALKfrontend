import { CardHeader, Typography, Stack, Link } from "@mui/material";

export const CustomCardHeader = ({title, subheader, subheaderLink, subheaderLinkTitle, ...props}) => {
  return(
    <CardHeader
      {...props}
      title={
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: { lg: '2.5rem', md: '2rem', xs: '1.25rem' }
        }}>
          {title}
      </Typography>}
      subheaderTypographyProps={{ fontSize: { lg: '1.25rem', md: '1rem', xs: '0.75rem'} }}
      subheader={
        <Stack direction='row' spacing={1} justifyContent='center' alignItems='baseline' sx={{marginTop: 0.75}}>
          <span>{subheader}</span>
          <Link href={subheaderLink} underline="none" color='primary'>{subheaderLinkTitle}</Link>
        </Stack>
      }
    />
  )

}