import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardMedia,
  CardActions
} from "@mui/material";
import { styled } from "@mui/system";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import dayjs from "dayjs";
import * as relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const StyledCard = styled(Card, {
  name: "Reaction",
  slot: "custom-card"
}) ({
  backgroundColor: '#131B3F',
  borderRadius: '8px'
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
  const timeAgo = dayjs(created_at).fromNow()
  // console.log('timeAgo', timeAgo)
  const { username, image } = profile;
  return (
    <StyledCard>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#cacaca' }} aria-label={`avatar-${tmsId}`} src={image} alt={`${username}_avatar`}>
            {username}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={timeAgo}
      >
      </CardHeader>
      <CardContent>
        <Typography color='#3361FF'>{hashtag}</Typography>
        <Typography>{text}</Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          // <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
    </StyledCard>
  );
};
