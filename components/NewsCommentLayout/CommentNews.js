import { ReplyMobileInput, ReplyDesktopInput } from "../Chat/Reply/Reply.styled"
import { useRef } from "react";
import useAxios from "../../services/api";
import { PostInputWrapper, IconButton } from "./NewsCommentLayout.styled";
import GifIcon from "../Icons/GifIcon";
import { Stack, Box } from "@mui/system";
import GaleryIcon from "../Icons/GaleryIcon";
import CameraIcon from "../Icons/CameraIcon";
import VideoIcon from "../Icons/VideoIcon";

export const CommentNews = ({ profile, story_id, isMobile }) => {
  const message = useRef(null)
  // const { axios } = useAxios()

  const onPost = async () => {
    // try {
    //   const response = await axios.post(`/comments?story_id=${story_id}`, {
    //     comment: {
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
  const onAddPhoto = () => {
    console.log('onAddPhoto', story_id)
  }
  const onMakePhoto = () => {
    console.log('onMakePhoto', story_id)
  }
  const onAddVideo = () => {
    console.log('onAddVideo', story_id)
  }
  const onAddGiff = () => {
    console.log('onAddGiff', story_id)
  }


  const AddMedia = (props) => {
    return (
      <Stack direction="row" spacing={ isMobile ? '2.68vw' : 1.25 } justifyContent='center' alignItems='center' >
        <IconButton onClick={onAddPhoto} icon={<GaleryIcon fontSize='inherit' />} {...props}/>
        <IconButton onClick={onMakePhoto} icon={<CameraIcon fontSize='inherit' />} {...props}/>
        <IconButton onClick={onAddVideo} icon={<VideoIcon fontSize='inherit' />} {...props}/>
        <IconButton onClick={onAddGiff} icon={<GifIcon fontSize='inherit' />} {...props}/>
      </Stack>
    );
  }

  return (
    <>
      <PostInputWrapper
        isMobile={isMobile}
        addition={ isMobile
          ? <Box pt={0.625}><AddMedia color='#A5B0D6' fontSize='1rem' size={36} /></Box>
          : null 
        }
      >
        { isMobile
          ? <ReplyMobileInput profile={profile} onPost={onPost} message={message} />
          : <ReplyDesktopInput profile={profile} onPost={onPost} message={message}>
            <AddMedia />
          </ReplyDesktopInput>
        }
      </PostInputWrapper>
    </>
  )
}