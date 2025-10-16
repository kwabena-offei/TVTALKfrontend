import { Avatar, Card, CardContent, Box, Typography, CardActions } from "@mui/material";
import { styled } from "@mui/system";
import { useContext } from "react";
import { FollowButton, UnfollowButton } from './FollowerCard.styled';
import { AuthContext } from "../../util/AuthContext";

import {
  useMutationUnfollow,
  useMutationFollow
} from "../../entities/user/hooks";

const StyledCard = styled(Card, {
  name: "Follower",
  slot: "custom-card"
}) ({
  backgroundColor: '#131B3F',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

const FollowerCard = ({
  follower: {
    id,
    username,
    image,
    is_following = false,
    reactions,
    comments_count
  },
  context = "followers", // "followers" or "following"
  isOwnProfile = false, // Are we viewing our own profile?
}) => {
  const { profile: currentUser } = useContext(AuthContext);

  const unfollowMutation = useMutationUnfollow();
  const followMutation = useMutationFollow();

  const isFollowing = (context === "following" && isOwnProfile) ? true : is_following;
  const isLoading = unfollowMutation.isPending || followMutation.isPending;

  const reactionsText = reactions || comments_count 
    ? `${reactions || comments_count} reactions` 
    : '0 reactions';

  // Don't show button if viewing own profile
  const shouldShowButton = currentUser?.id && currentUser.id !== id;

  const handleFollow = async () => {
    if (isLoading) return;

    try {
      if (isFollowing) {
        await unfollowMutation.mutate(id);
      } else {
       await followMutation.mutate(id);
      }
    } catch (error) {
      console.error("Failed to update relationship", error);
    }
  };

  return (
    <StyledCard>
      <Box display="flex" justifyContent="center" alignItems="center" px={2.5} pt={2.5} pb={1}>
        <Avatar
          sx={{ width: 120, height: 120 }}
          aria-label={`avatar-${username}-${id}`}
          src={image}
          alt={`${username}_avatar`}
        >
          {username}
        </Avatar>
      </Box>
      <CardContent sx={{ textAlign: 'center', padding: 0.5 }}>
        <Typography variant="h5" component='div'>{username}</Typography>
        <Typography variant="subtitle2" color='#919CC0' component='div'>{reactionsText}</Typography>
      </CardContent>
      {shouldShowButton && (
        <CardActions sx={{justifyContent: 'center', padding: 1.25, paddingBottom: 2.5 }}>
          {isFollowing ? (
            <UnfollowButton onClick={handleFollow} disabled={isLoading} />
          ) : (
            <FollowButton onClick={handleFollow} disabled={isLoading} />
          )}
        </CardActions>
      )}
    </StyledCard>
  );
};

export default FollowerCard;