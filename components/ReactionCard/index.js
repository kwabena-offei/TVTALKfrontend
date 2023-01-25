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
import RoundedButton from './RoundedIconButton'
import {
  CardWrapper,
  ReactionCardHashtags,
  ReactionCardText,
  ReactionCardActions,
  ReactionCardMedia,
  mobileIconButtonProps,
  cardActionsMobileProps
} from './ReactionCard.styled';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

dayjs.extend(relativeTime)

const ReactionCard = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    profile,
    id,
    text,
    hashtag,
    images,
    created_at,
    likes_count,
    sub_comments_count,
    shares_count
  } = props;

  const reactionsInfoCounts = {
    likes: {
      count: likes_count,
      icon: <FavoriteIcon color="primary" fontSize="inherit"/>
    },
    comments: {
      count: sub_comments_count,
      icon: <MessagesIcon color="primary" fontSize="inherit"/>
    },
    shares: {
      count: shares_count,
      icon: <ShareIcon color="primary" fontSize="inherit"/>
    }
  }
  const timeAgo = dayjs(created_at).fromNow()
  // ToDo: research for hashtag format and provide link-view for it
  const { username, image } = profile;
  return (
    <CardWrapper>
      <CardHeader isMobile={isMobile} userData={{ id, username, image, timeAgo }} />
      <CardContent sx={isMobile ? { paddingX: 2, paddingY: 1 } : { paddingX: 3.75, paddingY: 2.5 }}>
        <ReactionCardHashtags>{hashtag}</ReactionCardHashtags>
        <ReactionCardText isMobile={isMobile}>{text}</ReactionCardText>
        {!!images && !!images.length && (
          <ReactionCardMedia image={images[0]} />
        )}
      </CardContent>
      <ReactionCardActions sx={isMobile ? cardActionsMobileProps : ''}>
        <Stack direction="row" spacing={1.25}>
          {Object.entries(reactionsInfoCounts).map(([key, value]) => { return (<InfoCountWithIcon isMobile={isMobile} key={key} {...value} />) })}
        </Stack>
        <Stack direction="row" spacing={1.25}>
          <RoundedButton
            sx={isMobile ? mobileIconButtonProps : ''}
            onClick={() => { console.log("click add to favorites - id:", id) }}
            aria-label="add to favorites"
            icon={<FavoriteIcon fontSize='inherit' />}
          />
          <RoundedButton
            sx={isMobile ? mobileIconButtonProps : ''}
            aria-label="message" icon={<MessagesIcon fontSize='inherit' />} />
          <RoundedButton
            sx={isMobile ? mobileIconButtonProps : ''}
            aria-label="share" icon={<ShareIcon fontSize='inherit' />} />
        </Stack>
      </ReactionCardActions>
    </CardWrapper>
  );
};

export default ReactionCard;