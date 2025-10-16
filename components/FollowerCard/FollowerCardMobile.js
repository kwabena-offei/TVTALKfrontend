import { Avatar, Card, CardContent, Box, Typography, CardActions, Button, CardHeader } from "@mui/material";
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
  padding: 15
})

const FollowerCardMobile = ({
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
        subheader={reactionsText}
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