import React, { useState } from "react";
import {
  Box,
  CardContent,
  Stack
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MessagesIcon from '../Icons/MessagesIcon';
import ShareIcon from '../Icons/ShareIcon';

import {
  ReactionCardActions,
  ActionButton,
  cardActionsMobileProps
} from '../ReactionCard/ReactionCard.styled';
import { CardWrapper, MediaNews, TitleNews, DescriptionNews, SourceBox } from './NewsCard.styled';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactionCounts } from "../ReactionCard/ReactionCounts";
import PrimaryButton from "../PrimaryButton";
import { useRouter } from "next/router";
import { setLike } from "../../services/like";
import Share from "../Chat/Share";
import getConfig from "next/config";
import { TV_TALK_HOST, TV_TALK_HOST_LOCAL } from "../../util/constants";

const NewsCard = (props) => {
  const {
    description,
    id,
    iframe_enabled,
    image_url,
    likes_count,
    likes_count_by_followed_users,
    published_at,
    published_at_formatted,
    shares_count,
    show_id,
    source,
    title,
    url,
    commentMode
  } = props;
  const [likes, setLikes] = useState(likes_count);
  const [isLiked, setIsliked] = useState(false);
  const [shares, setShares] = useState(shares_count);
  const [openShare, setOpenShare] = useState(false);
  const image = image_url ? image_url : '/assets/no-picture-available.jpg';

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobileAndTablet = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig()
  const baseUrl = publicRuntimeConfig.API_ENV === 'development' ? TV_TALK_HOST_LOCAL : TV_TALK_HOST;
  const createUrl = new URL(router.asPath, baseUrl).pathname
  const copyLink = `${baseUrl}${createUrl}#${id}`
  const navigate = () => {
    if (iframe_enabled) {
      return router.push({
        pathname: '/news/original/[id]',
        query: {
          id: id
        }
      })
    }
    return router.push({
      pathname: '/news/[id]',
      query: {
        id: id
      }
    })
  }
  const onComment = () => {
    router.push({
      pathname: '/news/[id]/comment',
      query: {
        id: id
      }
    })
  }

  const liked = () => {
    setIsliked(true)
    setLikes(likes + 1)
  }
  const unliked = () => {
    setIsliked(false)
    setLikes(likes - 1)
  }
  const onLike = async () => {
    try {
      const response = await setLike({ type: 'storyId', id, isLiked: !isLiked })
      // console.log('onLike story response', response)
      const isLikedSuccess = response.data.stories.includes(id)
      isLikedSuccess ? liked() : unliked()
    } catch (error) {
      console.log('onLike story error', error)
    }
  }

  const toggleShare = () => setOpenShare(!openShare);
  const onShare = () => {
    toggleShare()
  }

  return (
    <CardWrapper id={id}>
      <MediaNews
        image={image}
        component="img"
        alt="News_screenshot"
        sx={
          commentMode
            ? { ["@media (min-width: 1200px)"]: { height: "560px" } }
            : {}
        }
      />
      <CardContent
        sx={{
          paddingX: isMobile ? "15px" : "30px",
          flexGrow: 1,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          marginBottom={isMobile ? "10px" : "14px"}
        >
          <SourceBox>{source}</SourceBox>
          <Stack direction="row" spacing={1.25}>
            <ReactionCounts
              likes={likes}
              shares={shares}
              sub_comments={likes_count_by_followed_users}
              isMobile={isMobile}
            />
          </Stack>
        </Stack>
        <TitleNews isMobile={isMobile}>{title}</TitleNews>
        <DescriptionNews isMobile={isMobile}>{description}</DescriptionNews>
      </CardContent>
      {commentMode ? null : (
        <ReactionCardActions sx={isMobile ? cardActionsMobileProps : {}}>
          <Box>
            <PrimaryButton onClick={navigate}>Read more</PrimaryButton>
          </Box>
          <Stack direction="row" spacing={1.25}>
            <ActionButton
              title="Like"
              isMobile={isMobileAndTablet}
              onClick={onLike}
              checked={isLiked}
              aria-label="Like"
              icon={<FavoriteIcon fontSize="inherit" />}
            />
            <ActionButton
              title="Comment"
              isMobile={isMobileAndTablet}
              aria-label="Comment"
              onClick={onComment}
              icon={<MessagesIcon fontSize="inherit" />}
            />
            <ActionButton
              title="Share"
              isMobile={isMobileAndTablet}
              aria-label="Share"
              onClick={onShare}
              icon={<ShareIcon fontSize="inherit" />}
            />
          </Stack>
          <Share
            setShares={setShares}
            open={openShare}
            onClose={toggleShare}
            url={copyLink}
            isMobile={isMobile}
            id={id}
            type={'story'}
          />
        </ReactionCardActions>
      )}
    </CardWrapper>
  );
};

export default NewsCard;