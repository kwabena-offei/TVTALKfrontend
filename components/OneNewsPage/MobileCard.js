import React from "react";
import { CardContent, Stack, Link, styled } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MessagesIcon from "../Icons/MessagesIcon";
import ShareIcon from "../Icons/ShareIcon";

import { ActionButton } from "../ReactionCard/ReactionCard.styled";
import {
  CardWrapper,
  MediaNews,
  TitleNews,
  DescriptionNews,
} from "../NewsCard/NewsCard.styled";
import PrimaryButton from "../PrimaryButton";

export const ReactionCardActions = styled(Stack)({
  justifyContent: "center",
  padding: "15px",
  paddingTop: 0,
});

const OneNewsCardMobile = ({
  description,
  id,
  image_url,
  title,
  url,
  parsedUrl,
  shortenedHostUrl,
  onComment,
  onLike,
  isLiked,
  onShare
}) => {
  const image = image_url ? image_url : "/assets/no-picture-available.jpg";

  return (
    <CardWrapper id={id} sx={{ marginBottom: "40px" }}>
      <MediaNews image={image} component="img" alt="News_screenshot" />
      <CardContent
        sx={{
          padding: "20px 15px",
          flexGrow: 1,
        }}
      >
        <TitleNews isMobile>{title}</TitleNews>
        <DescriptionNews isMobile>{description}</DescriptionNews>
      </CardContent>
      <ReactionCardActions direction="column" spacing={2}>
        <Stack direction="row" justifyContent="center" spacing={1.25}>
          <PrimaryButton component={Link} target="_blank" href={url}>
            Read on {shortenedHostUrl}
          </PrimaryButton>
        </Stack>
        <Stack direction="row" spacing={1.25} justifyContent="center">
          <ActionButton
            title="Like"
            isMobile
            onClick={onLike}
            checked={isLiked}
            aria-label="Like"
            icon={<FavoriteIcon fontSize="inherit" />}
          />
          <ActionButton
            title="Comment"
            isMobile
            aria-label="Comment"
            onClick={onComment}
            icon={<MessagesIcon fontSize="inherit" />}
          />
          <ActionButton
            title="Share"
            isMobile
            aria-label="Share"
            onClick={onShare}
            icon={<ShareIcon fontSize="inherit" />}
          />
        </Stack>
      </ReactionCardActions>
    </CardWrapper>
  );
};

export default OneNewsCardMobile;
