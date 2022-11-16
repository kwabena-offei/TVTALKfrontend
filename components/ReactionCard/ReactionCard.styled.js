import { styled } from "@mui/system";
import { Typography, Card, CardActions, CardMedia } from "@mui/material";

export const CardWrapper = styled(Card, {
  name: "Reaction",
  slot: "custom-card",
})({
  backgroundColor: "#131B3F",
  borderRadius: "8px",
});

export const ReactionCardHashtags = ({ children }) => {
  return <Typography color="#3361FF">{children}</Typography>;
};

export const ReactionCardText = ({ children, isMobile }) => {
  return (
    <Typography
      color="#EFF2FD"
      sx={{ fontSize: isMobile ? "1rem" : "1.5rem", lineHeight: "180%" }}
    >
      {children}
    </Typography>
  );
};

export const ReactionCardActions = styled(CardActions)({
  justifyContent: "space-between",
  padding: "20px 30px",
});

export const ReactionCardMedia = ({ image }) => {
  return (
    <CardMedia
      component="img"
      height="auto"
      image={image}
      alt="Show screenshot"
      sx={{ borderRadius: 2 }}
    />
  );
};

export const mobileIconButtonProps = {
  minWidth: "36px",
  minHeight: "36px",
};
export const cardActionsMobileProps = {
  paddingX: 2,
  paddingTop: 1,
  paddingBottom: 2,
};
export const cardHeaderMobileProps = {
  paddingX: 2,
  paddingTop: 2,
  paddingBottom: 1,
  alignItems: "center",
};
