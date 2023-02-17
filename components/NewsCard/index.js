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
    url
  } = props;
  const [likes, setLikes] = useState(likes_count);
  const [shares, setShares] = useState(shares_count);
  const image = image_url ? image_url : '/assets/no-picture-available.jpg';

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobileAndTablet = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter()
  const navigate = () => {
    if (iframe_enabled) {
      router.push({
        pathname: '/news/original/[source_url]',
        query: {
          source_url: url,
          source: source
        }
      })
    }
    router.push({
      pathname: '/news/[source_url]',
      query: {
        source_url: url
      }
    })
    console.log('url', url)
  }

  return (
    <CardWrapper id={id}>
      <MediaNews
        image={image}
        component="img"
        alt="News_screenshot"
      />
      <CardContent sx={{
          paddingX: isMobile ? '15px' : '30px',
          flexGrow: 1
        }}>
          <Stack direction='row' justifyContent='space-between' marginBottom={isMobile ? '10px' : '14px'}>
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
          <DescriptionNews isMobile={isMobile}>{description }</DescriptionNews>
      </CardContent>
       <ReactionCardActions sx={isMobile ? cardActionsMobileProps : {}}>
        <Box>
          <PrimaryButton
            onClick={navigate}
          >Read more</PrimaryButton>
        </Box>
        <Stack direction="row" spacing={1.25}>
          <ActionButton
            title='Like'
            isMobile={isMobileAndTablet}
            // onClick={onLike}
            // checked={isLiked}
            aria-label="Like"
            icon={<FavoriteIcon fontSize='inherit' />}
          />
          <ActionButton
            title='Comment'
            isMobile={isMobileAndTablet}
            aria-label="Comment"
            // onClick={onComment}
            icon={<MessagesIcon fontSize='inherit' />} />
          <ActionButton
            title="Share"
            isMobile={isMobileAndTablet}
            aria-label="Share"
            // onClick={onShare}
            icon={<ShareIcon fontSize='inherit' />} />
        </Stack>
      </ReactionCardActions>
    </CardWrapper>
  );
};

export default NewsCard;