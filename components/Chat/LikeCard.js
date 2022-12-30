import { Avatar, Card, CardHeader, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card) ({
  backgroundColor: 'transparent',
  padding: 0
})

const titleStyles = {
  fontWeight: 600,
  fontSize: '1.25rem',
  lineHeight: '120%'
}
const subheaderStyles = {
  color: '#636D92',
  fontWeight: 400,
  fontSize: '0.875rem',
  lineHeight: '120%'
}

const LikeCard = ({ data, ...props }) => {
  const isMobile = useMediaQuery((theme) => (theme.breakpoints.down('sm')));
  const { user_image, username, created_at_formatted: createdAt } = data;
  return (
    <StyledCard {...props}>
      <CardHeader
        sx={{ padding: 0 }}
        avatar={
          <Avatar
            src={user_image}
            alt={username}
            sx={{
              width: isMobile ? 50 : 60,
              height: isMobile ? 50 : 60
            }}
          />
        }
        title={username ? username : 'Unknown User'}
        titleTypographyProps={titleStyles}
        subheader={createdAt}
        subheaderTypographyProps={subheaderStyles}
      />
    </StyledCard>
  )
}

export default LikeCard;