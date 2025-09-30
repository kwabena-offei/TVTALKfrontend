import { Avatar, Card, CardContent, Box, Typography, CardActions, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useState, useEffect, useContext } from "react";
import { FollowButton, UnfollowButton } from './FollowerCard.styled';
import useAxios from "../../services/api";
import { AuthContext } from "../../util/AuthContext";

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
  id, 
  username, 
  image, 
  is_following = false, 
  context = "followers", // "followers" or "following"
  isOwnProfile = false, // Are we viewing our own profile?
  onUnfollow,
  onFollowChange, // Callback to refresh data after follow/unfollow
  ...props 
}) => {
  const { axios: axiosClient } = useAxios();
  const { profile: currentUser } = useContext(AuthContext);
  
  // LOGIC:
  // - If viewing OWN "following" list → we're following them by definition → true
  // - Otherwise → use is_following from backend
  const initialFollowingState = (context === "following" && isOwnProfile) ? true : is_following;
  const [isFollowing, setIsFollowing] = useState(initialFollowingState);
  const [isLoading, setIsLoading] = useState(false);

  // Update state if is_following prop changes
  useEffect(() => {
    setIsFollowing((context === "following" && isOwnProfile) ? true : is_following);
  }, [is_following, context, isOwnProfile]);

  const reactions = props.reactions || props.comments_count 
    ? `${props.reactions || props.comments_count} reactions` 
    : '0 reactions';

  // Don't show button if viewing own profile
  const shouldShowButton = currentUser?.id && currentUser.id !== id;

  const handleFollow = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (isFollowing) {
        // Unfollow
        await axiosClient.delete(`/relationships/${id}`);
        setIsFollowing(false);
        
        // If we're on our own "following" list, notify parent to remove this user
        if (context === "following" && isOwnProfile && onUnfollow) {
          onUnfollow(id);
        }
      } else {
        // Follow
        await axiosClient.post(`/relationships`, {
          followed_id: id,
        });
        setIsFollowing(true);
      }

      // Notify parent to refresh data
      if (onFollowChange) {
        onFollowChange();
      }
    } catch (error) {
      console.error("Failed to update relationship", error);
      // Revert state on error
      setIsFollowing(!isFollowing);
    } finally {
      setIsLoading(false);
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
        <Typography variant="subtitle2" color='#919CC0' component='div'>{reactions}</Typography>
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