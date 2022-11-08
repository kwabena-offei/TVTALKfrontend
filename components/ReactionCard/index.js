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
  ReactionCardMedia
} from './ReactionCard.styled';

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
    shares_count
  } = props;

  const reactionsInfoCounts = {
    likes: {
      count: likes_count,
      icon: <FavoriteIcon color="primary" />
    },
    comments: {
      count: sub_comments_count,
      icon: <MessagesIcon color="primary" />
    },
    shares: {
      count: shares_count,
      icon: <ShareIcon color="primary" />
    }
  }
  const timeAgo = dayjs(created_at).fromNow()
  // ToDo: research for hashtag format and provide link-view for it
  const { username, image } = profile;
  return (
    <CardWrapper>
      <CardHeader userData={{ id, username, image, timeAgo }} />
      <CardContent sx={{ paddingX: 3.75, paddingY: 2.5 }}>
        <ReactionCardHashtags>{hashtag}</ReactionCardHashtags>
        <ReactionCardText>{text}</ReactionCardText>
        {!!images && !!images.length && (
          <ReactionCardMedia image={images[0]} />
        )}
      </CardContent>
      <ReactionCardActions>
        <Stack direction="row" spacing={1.25}>
          {Object.entries(reactionsInfoCounts).map(([key, value]) => { return (<InfoCountWithIcon key={key} {...value} />) })}
        </Stack>
        <Stack direction="row" spacing={1.25}>
          <RoundedButton
            onClick={() => { console.log("click add to favorites - id:", id) }}
            aria-label="add to favorites"
            icon={<FavoriteIcon fontSize='inherit' />}
          />
          <RoundedButton aria-label="message" icon={<MessagesIcon fontSize='inherit' />} />
          <RoundedButton aria-label="share" icon={<ShareIcon fontSize='inherit' />} />
        </Stack>
      </ReactionCardActions>
    </CardWrapper>
  );
};

export default ReactionCard;