import React from "react";
import { CardContent } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MessagesIcon from "../../Icons/MessagesIcon";
import ShareIcon from "../../Icons/ShareIcon";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import CardHeader from "../../ReactionCard/CardHeader";

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
  commentType
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  // -- Redirect for reply on subComment 
  const onReply = () => {
    // Todo: uncomment, when backend data fixed

    // router.push({
    //   pathname: '/chat/[tmsId]/comments/[id]/replies',
    //   query: {
    //     tmsId: router.query.tmsId,
    //     id: id,
    //     type: commentType
    //   }
    // })
  }

  // const timeAgo = dayjs(created_at).fromNow();
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
              ? cardActionsMobileProps
              : { justifyContent: "flex-start" }
          }
        >
          <ActionButton
            title="Like"
            onClick={() => {
              console.log("click add to favorites - id:", id);
            }}
            aria-label="Like"
            icon={<FavoriteIcon fontSize="inherit" />}
          />
          <ActionButton
            title="Reply"
            aria-label="Reply"
            onClick={onReply}
            icon={<MessagesIcon fontSize="inherit" />}
          />
          <ActionButton
            title="Share"
            aria-label="Share"
            icon={<ShareIcon fontSize="inherit" />}
          />
        </CommentCardActions>
      )}
    </CardWrapper>
  );
};

export default CommentCard;
