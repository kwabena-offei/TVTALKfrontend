import { styled } from "@mui/system";
import { Card, CardActions, Button, Typography } from "@mui/material";

export const CardWrapper = styled(Card, {
  name: "Comment",
  slot: "custom-card",
})({
  backgroundColor: "#131B3F",
  borderRadius: "8px",
});

export const CommentCardActions = styled(CardActions)({
  justifyContent: "space-between",
  paddingTop: 0,
  paddingBottom: 20,
  paddingLeft: 30,
  paddingRight: 30,
  "&.MuiCardActions-root>:not(:first-of-type)": {
    marginLeft: 15
  },
});

export const CardText = ({ children, isMobile, ...props }) => {
  return (
    <Typography
      color="#EFF2FD"
      variant="body1"
      as='pre'
      sx={{
        fontSize: isMobile ? "1rem" : "1.5rem",
        lineHeight: "180%",
        whiteSpace: 'break-spaces'
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const ActionButton = ({
  isMobile,
  withTitleMode,
  title,
  icon,
  onClick,
  checked,
  ...props
}) => (
  <Button
    sx={{
      padding: "0.4em 0.8em",
      fontSize: "1rem",
    }}
    color='neutral'
    onClick={onClick}
    startIcon={icon}
    {...props}
  >
    {title}
  </Button>
);

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
