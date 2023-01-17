import React from "react";
import {
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
  ActionButton,
  cardActionsMobileProps
} from './ReactionCard.styled';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";

dayjs.extend(relativeTime)

const ReactionCard = (props) => {
  const {
    profile,
    id,
    text,
    hashtag,
    images,
    created_at,
    likes_count,
    sub_comments_count,
    shares_count,
    tmsId,
    commentsMode,
    withoutActions,
    commentType,
    header
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobileAndTablet = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter()

  const reactionsInfoCounts = {
    likes: {
      count: likes_count,
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
  const timeAgo = dayjs(created_at).fromNow()
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

  return (
    <CardWrapper sx={withoutActions ? { paddingBottom: 2 } : {} } id={id}>
      <CardHeader isMobile={isMobile} userData={{ id, username, image, timeAgo }} header={header} commentType={commentType} tmsId={tmsId}/>
      <CardContent sx={isMobile ? { paddingX: 2, paddingY: 1 } : { paddingX: 3.75, paddingY: 2.5 }}>
        <ReactionCardHashtags>{hashtag}</ReactionCardHashtags>
        <ReactionCardText isMobile={isMobile}>{text}</ReactionCardText>
        {!!images && !!images.length && (
          <ReactionCardMedia image={images[0]} />
        )}
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
            onClick={() => { console.log("click add to favorites - id:", id) }}
            aria-label="Like"
            icon={<FavoriteIcon fontSize='inherit' />}
          />
          <ActionButton
            withTitleMode={commentsMode}
            title='Comment'
            isMobile={isMobileAndTablet}
            aria-label="Comment"
            icon={<MessagesIcon fontSize='inherit' />} />
          <ActionButton
            withTitleMode={commentsMode}
            title="Share"
            isMobile={isMobileAndTablet}
            aria-label="Share"
            icon={<ShareIcon fontSize='inherit' />} />
        </Stack>
      </ReactionCardActions>}
    </CardWrapper>
  );
};

export default ReactionCard;