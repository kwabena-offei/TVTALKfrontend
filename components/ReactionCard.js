import React from "react";
import {
  Card,
  Avatar,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Stack
} from "@mui/material";
import { styled } from "@mui/system";
import MoreVertIcon from './Icons/MoreVertIcon';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MessagesIcon from './Icons/MessagesIcon';
import ShareIcon from './Icons/ShareIcon';
import IconButton from '@mui/material/IconButton';
import dayjs from "dayjs";
import * as relativeTime from 'dayjs/plugin/relativeTime';
import CardHeader from './ReactionCard/CardHeader'
import InfoCountWithIcon from './ReactionCard/InfoCountWithIcon'
import RoundedButton from './ReactionCard/RoundedIconButton'

dayjs.extend(relativeTime)

const StyledCard = styled(Card, {
  name: "Reaction",
  slot: "custom-card"
}) ({
  backgroundColor: '#131B3F',
  borderRadius: '8px',
})

export const ReactionCard = (props) => {
  const {
    profile,
    id,
    text,
    hashtag,
    images,
    created_at,
    updated_at,
    show_id,
    likes_count,
    sub_comments_count,
    videos,
    shares_count,
    story_id,
    mute_notifications,
    status,
    tmsId,
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

  // const hashtag = ['Ozark', 'S4:E2']
  // console.log('hashtag', hashtag)
  const { username, image } = profile;
  return (
    <StyledCard>
      <CardHeader userData={{id, username, image, timeAgo}} />
      <CardContent sx={{ paddingX: 3.75, paddingY: 2.5 }}>
        <Typography color="#3361FF">{hashtag}</Typography>
        <Typography color='#EFF2FD' sx={{ fontSize: 20, lineHeight: '180%' }} >{text}</Typography>
        {!!images && !!images.length && (
          <CardMedia
            component="img"
            height="auto"
            image={images[0]}
            alt="Show screenshot"
            sx={{ borderRadius: 2 }}
          />
        )}
      </CardContent>
      <CardActions
        sx={{ justifyContent: "space-between", paddingX: 3.75, paddingY: 2.5 }}
      >
        <Stack direction="row" spacing={2.5}>
        {Object.entries(reactionsInfoCounts).map(([key, value]) => { return (<InfoCountWithIcon key={key} {...value} />)})}
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <RoundedButton
            onClick={() => {console.log("click add to favorites - id:", id)}}
            aria-label="add to favorites"
            icon={<FavoriteIcon />}
          />
          <RoundedButton aria-label="message" icon={<MessagesIcon />}/>
          <RoundedButton aria-label="share" icon={<ShareIcon />} />
        </Stack>
      </CardActions>
    </StyledCard>
  );
};
