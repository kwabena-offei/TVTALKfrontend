import { ReplyMobileInput, ReplyDesktopInput } from "../Chat/Reply/Reply.styled"
import { useTheme, useMediaQuery } from "@mui/material";
import { useRef } from "react";
import useAxios from "../../services/api";
import { PostInputWrapper } from "./NewsCommentLayout.styled";
import { NewsMainContainer } from "../NewsCard/NewsCard.styled";

export const CommentNews = ({ profile, story_id }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const message = useRef(null)
  // const { axios } = useAxios()

  const onPost = async () => {
    // try {
    //   const response = await axios.post(`/sub_comments?comment_id=${comment.id}`, {
    //     sub_comment: {
    //       text: message.current.value,
    //       comment_id: comment.id,
    //       sub_comment_id: null,
    //       images: [],
    //       videos: [],
    //       mute_notifications: false,
    //     }
    //   })
      console.log('[post][response]')
    //   message.current.value = ''
    // } catch (error) {
    //   console.log('post error', error)
    // }
  }

  return (
    <PostInputWrapper>
      { isMobile 
        ? <ReplyMobileInput profile={profile} onPost={onPost} message={message} /> 
        : <ReplyDesktopInput profile={profile} onPost={onPost} message={message} />
      }
    </PostInputWrapper>
  )
}