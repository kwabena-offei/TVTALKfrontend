import { ReplyMobileInput, ReplyDesktopInput, ReplyInputWrapper } from "./Reply.styled"
import { useRef } from "react";
import useAxios from "../../../services/api";

export const Reply = ({ isMobile, profile, comment }) => {
  const message = useRef(null)
  const { axios } = useAxios()

  const onPost = async () => {
    try {
      await axios.post(`/sub_comments?comment_id=${comment.id}`, {
        sub_comment: {
          text: message.current.value,
          comment_id: comment.id,
          sub_comment_id: null,
          images: [],
          videos: [],
          mute_notifications: false,
        }
      })
      message.current.value = ''
    } catch (error) {
      console.log('post error', error)
    }
  }

  return (
    <ReplyInputWrapper isMobile={isMobile}>
      { isMobile 
        ? <ReplyMobileInput profile={profile} onPost={onPost} message={message} /> 
        : <ReplyDesktopInput profile={profile} onPost={onPost} message={message} />
      }
    </ReplyInputWrapper>
  )
}