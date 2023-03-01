import { ReplyMobileInput, ReplyDesktopInput } from "../Chat/Reply/Reply.styled"
import { useState, useRef, useContext } from "react";
import useAxios from "../../services/api";
import { PostInputWrapper, IconButton } from "./NewsCommentLayout.styled";
import GifIcon from "../Icons/GifIcon";
import { Stack, Box } from "@mui/system";
import GaleryIcon from "../Icons/GaleryIcon";
import CameraIcon from "../Icons/CameraIcon";
import VideoIcon from "../Icons/VideoIcon";
import SearchGif from "../Chat/AddGiff";
import dynamic from 'next/dynamic';
import { AuthContext } from "../../util/AuthContext";
import { UploadedMedia, UploadedVideos } from "../Chat/NewPostCard/NewPostCard.styled";

const UploadFiles = dynamic(
  () => import("../Chat/NewPostCard/UploadFiles"),
  { ssr: false }
)

export const CommentNews = ({ profile, story_id, isMobile }) => {
  const message = useRef()
  const { axios } = useAxios()
  const isAuth = useContext(AuthContext);
  const [openGiff, setOpenGiff] = useState(false)
  const toggleGiff = () => setOpenGiff(!openGiff)
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [acceptType, setAcceptType] = useState()
  const [sources, setSources] = useState(null)
  const [openUploadFile, setOpenUloadFile] = useState(false)
  const toggleUploadFile = () => setOpenUloadFile(!openUploadFile)

  const handleCloseUpload = async (response) => {
    const { filesFailed, filesUploaded } = response
    if (filesFailed.length > 0) {
      // ToDo: add behaviour in case the file has not uploaded (if it's needed)
      console.log('Upload failed failed for files: ', filesFailed)
      return
    }
    if (!filesUploaded.length) {
      console.log('No uploaded files')
      return
    }

    for (const file of filesUploaded) {
      const [ type, _extension ] = file.mimetype.split('/')
      const responseUrl = file.url

      // -- handle url for video type file --
      if (type === 'video') {
        setVideos((prevState) => ([
          ...prevState,
          {
            name: file.originalFile.name,
            url: responseUrl,
            handle: file.handle
          }
        ]))
      }

      // -- handle url for image type file --
      if (type === 'image') {
        setImages((prevState) => ([
          ...prevState,
          responseUrl
        ]))
      }
    }

    toggleUploadFile()
  }

  const onAddPhoto = () => {
    setAcceptType(['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
    setSources(['local_file_system', 'url'])
    toggleUploadFile()
  }

  const onTakeShot = () => {
    setAcceptType(['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
    setSources(['webcam', 'local_file_system'])
    toggleUploadFile()
  }

  const onAddVideo = () => {
    setAcceptType(['video/*'])
    setSources([ 'video', 'local_file_system', 'url'])
    toggleUploadFile()
  }

  const onAddGif = () => {
    toggleGiff()
  }

  const onPost = async () => {
    try {
      const response = await axios.post(`/comments?story_id=${story_id}`, {
        comment: {
          text: message.current.value,
          story_id: story_id,
          images: images,
          videos: videos.map((video) => (video.url)),
          mute_notifications: false,
        }
      })
      console.log('[post][response]', response)
      message.current.value = ''
      setVideos([])
      setImages([])
    } catch (error) {
      console.log('post error', error)
    }
  }
  const onGifClick = (objURL) => {
    const newValue = objURL.images.original.url
    setImages((prevState) => ([
      ...prevState,
      newValue
    ]))
    toggleGiff()
  }
  const removeMedia = ({ image, index }) => {
    const updatedMedia = images.filter((media, media_index) => (
      !(media_index === index && media === image)
    ))
    setImages(updatedMedia)
  }
  const removeVideo = (item) => {
    const updateVideo = videos.filter((video) => (
      !(video.handle === item)
    ))
    setVideos(updateVideo)
  }
  const cardStyle = {
    px: isMobile ? 2.5 : 5,
    fontSize: '1.25rem',
    py: '5px',
    ':last-child': { paddingBottom: '10px' }
  }

  const AddMedia = (props) => {
    return (
      <Stack direction="row" spacing={ isMobile ? '2.68vw' : 1.25 } justifyContent='center' alignItems='center' >
        <IconButton onClick={onAddPhoto} icon={<GaleryIcon fontSize='inherit' />} {...props}/>
        <IconButton onClick={onTakeShot} icon={<CameraIcon fontSize='inherit' />} {...props}/>
        <IconButton onClick={onAddVideo} icon={<VideoIcon fontSize='inherit' />} {...props}/>
        <IconButton onClick={onAddGif} icon={<GifIcon fontSize='inherit' />} {...props}/>
      </Stack>
    );
  }

  return (
    <>
      <PostInputWrapper
        isMobile={isMobile}
        media={
          <>
            { images.length
              ? <UploadedMedia images={images} removeMedia={removeMedia} cardStyle={cardStyle} />
              : null
            }
            { videos.length
              ? <UploadedVideos videos={videos} removeVideo={removeVideo} cardStyle={cardStyle} />
              : null
            }
          </>
        }
        addition={ isMobile
          ? <Box pt={0.625}><AddMedia disabled={!isAuth} color='#A5B0D6' fontSize='1rem' size={36} /></Box>
          : null 
        }
      >
        { isMobile
          ? <ReplyMobileInput profile={profile} onPost={onPost} message={message} />
          : <ReplyDesktopInput profile={profile} onPost={onPost} message={message}>
            <AddMedia disabled={!isAuth} />
          </ReplyDesktopInput>
        }
      </PostInputWrapper>
      <SearchGif open={openGiff} handleClose={toggleGiff} onGifClick={onGifClick}/>
      { openUploadFile
        ? <UploadFiles
          onCancel={toggleUploadFile}
          onClose={toggleUploadFile}
          onOpen={() => setOpenUloadFile(true)}
          onUploadDone={handleCloseUpload}
          accept={acceptType}
          sources={sources}
        />
        : null
      }
    </>
  )
}