import {
  Button
} from "@mui/material";

export const FollowButton = ({ ...props }) => {
  return (
    <Button {...props} variant="contained" color="primary">
      Follow
    </Button>
  );
};

export const UnfollowButton = ({ ...props }) => {
  return (
    <Button
      {...props}
      variant="outlined"
      color="secondary"
      sx={{
        borderColor: "secondary.contrastText",
        backgroundColor: "secondary.contrastText",
      }}
    >
      Unfollow
    </Button>
  );
};
