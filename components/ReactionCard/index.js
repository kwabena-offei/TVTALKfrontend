import React, { useState } from "react";
import {
  Box,
  CardContent,
  Stack
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MessagesIcon from '../Icons/MessagesIcon';
import ShareIcon from '../Icons/ShareIcon';
import dayjs from "dayjs";
import * as relativeTime from 'dayjs/plugin/relativeTime';
import CardHeader from './CardHeader'
import InfoCountWithIcon from './InfoCountWithIcon'
import {
  CardWrapper,
  ReactionCardHashtags,
  ReactionCardText,
  ReactionCardActions,
  ReactionCardMedia,
  ReactionCardVideo,
  ActionButton,
  cardActionsMobileProps
} from './ReactionCard.styled';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import { setLike } from "../../services/like";
import { TV_TALK_HOST_LOCAL, TV_TALK_HOST } from "../../util/constants";
import getConfig from "next/config";
import Share from "../Chat/Share";

dayjs.extend(relativeTime)

const ReactionCard = (props) => {
  const {
    profile,
    id,
    text,
    hashtag,
    images,
    videos,
    created_at,
    created_at_formatted,
    likes_count,
    current_user_liked,
    sub_comments_count,
    shares_count,
    tmsId,
    commentsMode,
    withoutActions,
    commentType,
    header
  } = props;
  const { publicRuntimeConfig } = getConfig();
  const [likes, setLikes] = useState(likes_count)
  const liked = () => {
    setIsliked(true)
    setLikes(likes + 1)
  }
  const unliked = () => {
    setIsliked(false)
    setLikes(likes - 1)
  }
  const [openShare, setOpenShare] = useState(false);
  const toggleShare = () => setOpenShare(!openShare);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobileAndTablet = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter()
  const baseUrl = publicRuntimeConfig.API_ENV === 'development' ? TV_TALK_HOST_LOCAL : TV_TALK_HOST;
  const copyLink = `${baseUrl}${router.asPath}#${id}`

  const reactionsInfoCounts = {
    likes: {
      count: likes,
      icon: <FavoriteIcon color="primary" fontSize="inherit"/>,
      route: 'likes'
    },
    comments: {
      count: sub_comments_count,
      icon: <MessagesIcon color="primary" fontSize="inherit"/>,
      route: 'replies'
    },
    shares: {
      count: shares_count,
      icon: <ShareIcon color="primary" fontSize="inherit"/>,
      route: 'shares'
    }
  }
  const timeAgo = created_at_formatted || dayjs(created_at).fromNow()
  const [isLiked, setIsliked] = useState(current_user_liked)
  // ToDo: research for hashtag format and provide link-view for it
  const { username, image } = profile;
  // -- navigate user to current comment page --
  const openCommentPage = (route) => {
    router.push({
      pathname: '/chat/[tmsId]/comments/[id]/[page]',
      query: {
        tmsId: tmsId,
        id: id,
        page: route
      }
    })
  }

  const onLike = async () => {
    try {
      const response = await setLike({ type: 'commentId', id, isLiked: !isLiked })
      const isLikedSuccess = response.data.comments.includes(id)
      isLikedSuccess ? liked() : unliked()
    } catch (error) {
      console.error(error.message)
    }
  }
  const onComment = () => openCommentPage('replies')
  const onShare = () => {
    toggleShare()
  }

  return (
    <CardWrapper sx={withoutActions ? { paddingBottom: 2 } : {} } id={id}>
      <CardHeader isMobile={isMobile} userData={{ id, username, image, timeAgo }} header={header} commentType={commentType} tmsId={tmsId}/>
      <CardContent sx={isMobile ? { paddingX: 2, paddingY: 0.5 } : { paddingX: 3.75, paddingY: 1.25 }}>
        <ReactionCardHashtags>{hashtag}</ReactionCardHashtags>
        <ReactionCardText isMobile={isMobile}>{text}</ReactionCardText>
        { images?.length ? images.map((image, index) => (
          <Box key={`${id}-${image}-${index}`} sx={{ paddingY: 1.25}}>
            <ReactionCardMedia image={image} />
          </Box>
        )) : null}
        { videos?.length ? videos.map((video, index) => (
            <Box key={`${id}-${video}-${index}`} sx={{ paddingY: 1.25}}>
              <ReactionCardVideo video={video} />
            </Box>
          )) : null }
      </CardContent>
      {withoutActions
      ? null
      : <ReactionCardActions sx={isMobile ? cardActionsMobileProps : {}}>
        <Stack direction="row" spacing={1.25}>
          {Object.entries(reactionsInfoCounts).map(([key, value]) => { return (<InfoCountWithIcon isMobile={isMobile} key={key} {...value} navigation={() => openCommentPage(value.route)} />) })}
        </Stack>
        <Stack direction="row" spacing={1.25}>
          <ActionButton
            withTitleMode={commentsMode}
            title='Like'
            isMobile={isMobileAndTablet}
            onClick={onLike}
            checked={isLiked}
            aria-label="Like"
            icon={<FavoriteIcon fontSize='inherit' />}
          />
          <ActionButton
            withTitleMode={commentsMode}
            title='Comment'
            isMobile={isMobileAndTablet}
            aria-label="Comment"
            onClick={onComment}
            icon={<MessagesIcon fontSize='inherit' />} />
          <ActionButton
            withTitleMode={commentsMode}
            title="Share"
            isMobile={isMobileAndTablet}
            aria-label="Share"
            onClick={onShare}
            icon={<ShareIcon fontSize='inherit' />} />
        </Stack>
      </ReactionCardActions>}
      <Share
        open={openShare}
        onClose={toggleShare}
        url={copyLink}
        isMobile={isMobile}
      />
    </CardWrapper>
  );
};

export default ReactionCard;