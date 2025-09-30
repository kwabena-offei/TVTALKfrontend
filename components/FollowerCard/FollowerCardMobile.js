import { Avatar, Card, CardContent, Box, Typography, CardActions, Button, CardHeader } from "@mui/material";
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
  padding: 15
})

const FollowerCardMobile = ({ 
  id, 
  username, 
  image, 
  is_following = false, 
  context = "followers", // "followers" or "following"
  onUnfollow,
  onFollowChange, // Callback to refresh data after follow/unfollow
  ...props 
}) => {
  const { axios: axiosClient } = useAxios();
  const { profile: currentUser } = useContext(AuthContext);
  
  // For "following" context, we are always following them by definition
  // For "followers" context, use the is_following prop
  const initialFollowingState = context === "following" ? true : is_following;
  const [isFollowing, setIsFollowing] = useState(initialFollowingState);
  const [isLoading, setIsLoading] = useState(false);

  // Update state if is_following prop changes
  useEffect(() => {
    if (context === "followers") {
      setIsFollowing(is_following);
    }
  }, [is_following, context]);

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
        
        // If we're in the "following" context, notify parent to remove this user
        if (context === "following" && onUnfollow) {
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
      <CardHeader
        sx={{ p: 0 }}
        classes={{ action: 'align-self-center mr-0'}}
        avatar={
          <Avatar
            sx={{ width: 50, height: 50 }}
            aria-label={`avatar-${username}-${id}`}
            src={image}
            alt={`${username}_avatar`}
          >
            {username}
          </Avatar>
        }
        title={username}
        subheader={reactions}
        action={
          shouldShowButton && (
            isFollowing ? (
              <UnfollowButton onClick={handleFollow} disabled={isLoading} />
            ) : (
              <FollowButton onClick={handleFollow} disabled={isLoading} />
            )
          )
        }
        titleTypographyProps={{ fontSize: '1rem', fontWeight: 500, lineHeight: '130%' }}
        subheaderTypographyProps={{ fontSize: '0.75rem', lineHeight: '130%'}}
      >
      </CardHeader>
    </StyledCard>
  );
};

export default FollowerCardMobile;