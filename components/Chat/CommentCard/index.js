import React, { useState } from "react";
import { CardContent } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Favorite } from "@mui/icons-material";
// import MessagesIcon from "../../Icons/MessagesIcon";
import ShareIcon from "../../Icons/ShareIcon";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import CardHeader from "../../ReactionCard/CardHeader";
import getConfig from "next/config";
import { TV_TALK_HOST, TV_TALK_HOST_LOCAL } from "../../../util/constants";
import Share from "../Share";

import { ReactionCardMedia } from "../../ReactionCard/ReactionCard.styled";
import {
  CardWrapper,
  CommentCardActions,
  ActionButton,
  CardText,
  cardActionsMobileProps,
} from "./CommentCard.styled";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import { setLike } from "../../../services/like"; 

dayjs.extend(relativeTime);

const CommentCard = ({
  profile,
  id,
  tmsId,
  text,
  images,
  created_at,
  created_at_formatted,
  header,
  withoutActions,
  commentType,
  likes_count
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = publicRuntimeConfig.API_ENV === 'development' ? TV_TALK_HOST_LOCAL : TV_TALK_HOST;
  const copyLink = header ? `${baseUrl}${router.asPath}` : `${baseUrl}${router.asPath}#${id}`
  const [openShare, setOpenShare] = useState(false);
  const toggleShare = () => setOpenShare(!openShare);
  const [isLiked, setIsliked] = useState(Boolean(likes_count))

  // -- Redirect for reply on subComment 
  // const onReply = () => {
  //   // Todo: uncomment, when backend data fixed

  //   // router.push({
  //   //   pathname: '/chat/[tmsId]/comments/[id]/replies',
  //   //   query: {
  //   //     tmsId: router.query.tmsId,
  //   //     id: id,
  //   //     type: commentType
  //   //   }
  //   // })
  // }
  const onLike = async () => {
    try {
      const response = await setLike({ type: 'subCommentId', id, isLiked: !isLiked })
      setIsliked(response.data.sub_comments.includes(id))
    } catch (error) {
      console.error(error.message)
    }
  }
  const onShare = () => {
    toggleShare()
  }

  const timeAgo = created_at_formatted

  const { username, image } = profile;
  return (
    <CardWrapper sx={withoutActions ? { paddingBottom: 2 } : {}} id={id}>
      <CardHeader
        isMobile={isMobile}
        userData={{ id, username, image, timeAgo }}
        commentType={commentType}
        tmsId={tmsId}
        header={header}
      />
      <CardContent
        sx={
          isMobile
            ? { paddingX: 2, paddingTop: 0 }
            : { paddingX: 3.75, paddingTop: 0 }
        }
      >
        <CardText isMobile={isMobile}>
          {text}
        </CardText>
        {images?.length ? images.map((image) => (
          <Box key={`${id}-${image}-${index}`} sx={index < images.length - 1 ? { marginBottom: 2 } : {}}>
            <ReactionCardMedia image={image} />
          </Box>
        )) : null}
      </CardContent>
      {withoutActions ? null : (
        <CommentCardActions
          sx={
            isMobile
              ? { ...cardActionsMobileProps, justifyContent: "flex-start" }
              : { justifyContent: "flex-start" }
          }
        >
          <ActionButton
            title="Like"
            onClick={onLike}
            aria-label="Like"
            icon={isLiked ? <Favorite fontSize="inherit" /> : <FavoriteIcon fontSize="inherit" />}
          />
          {/* <ActionButton
            title="Reply"
            aria-label="Reply"
            onClick={onReply}
            icon={<MessagesIcon fontSize="inherit" />}
          /> */}
          <ActionButton
            title="Share"
            aria-label="Share"
            onClick={onShare}
            icon={<ShareIcon fontSize="inherit" />}
          />
        </CommentCardActions>
      )}
      <Share
        open={openShare}
        onClose={toggleShare}
        url={copyLink}
        isMobile={isMobile}
      />
    </CardWrapper>
  );
};

export default CommentCard;
