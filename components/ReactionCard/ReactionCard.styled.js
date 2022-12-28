import { styled } from "@mui/system";
import { Typography, Card, CardActions, CardMedia } from "@mui/material";
import { OutlinedButton } from "../OutlinedButton";
import RoundedIconButton from './RoundedIconButton';

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

export const ReactionCardText = ({ children, isMobile, ...props }) => {
  return (
    <Typography
      color="#EFF2FD"
      variant="body1"
      as='pre'
      sx={{ fontSize: isMobile ? "1rem" : "1.5rem", lineHeight: "180%", whiteSpace: 'break-spaces', ...props.sx }}
      {...props}
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

export const ActionButton = ({ isMobile, withTitleMode, title, icon, onClick, ...props }) => {
  if (!isMobile && withTitleMode) {
    return (
      <OutlinedButton
        sx={{
          height: "50px",
          padding: "1em 2em",
          fontSize: '1rem',
          ...props.sx
        }}
        onClick={onClick}
        startIcon={icon}
        {...props}
      >
        {title}
      </OutlinedButton>
    )
  }
  return <RoundedIconButton onClick={onClick} icon={icon} {...props} />;
}

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
