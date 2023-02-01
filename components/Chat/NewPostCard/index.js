import { Avatar, CardActions, CardHeader, InputBase } from "@mui/material";
import { StyledCard, stackStyle, DesktopCardActions, MobileCardActions, UploadedVideos, UploadedMedia } from "./NewPostCard.styled";
import { useContext, useRef, useState } from "react";
import { AuthContext } from '../../../util/AuthContext'
import useAxios from "../../../services/api";
import SearchGif from "../AddGiff";
import dynamic from 'next/dynamic'

const UploadFiles = dynamic(
  () => import("./UploadFiles"),
  { ssr: false }
)

const NewPostCard = (props) => {
  const { isMobile, profile, show_id, story_id } = props;
  const isAuth = useContext(AuthContext);
  const { image } = profile | ''
  const size = isMobile ? 50 : 60;
  const [openGiff, setOpenGiff] = useState(false)
  const toggleGiff = () => setOpenGiff(!openGiff)
  const { axios } = useAxios()
  const message = useRef()
  const commentRef = useRef({
    text: '',
    images: [],
    videos: []
  })
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [acceptType, setAcceptType] = useState()
  const [sources, setSources] = useState(null)
  const [openUploadFile, setOpenUloadFile] = useState(false)
  const toggleUploadFile = () => setOpenUloadFile(!openUploadFile)

  const handleCloseUpload = async (response) => {
    // console.log('response', response)
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

  const onAddHashtag = (event) => {console.log('onAddHashtag', event.target.value)}  

  const onAddPhotosVideo = () => {
    setAcceptType(['video/*', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'])
    setSources(['url'])
    toggleUploadFile()
  }
  const onAddGif = () => {
    toggleGiff()
    // console.log('onAddGif', commentRef.current)
  }
  const onAddPhoto = () => {
    setAcceptType(['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
    setSources(['url'])
    toggleUploadFile()
  }
  const onAddVideo = () => {
    setAcceptType(['video/*'])
    setSources(['url'])
    toggleUploadFile()
  }
  const onTakeShot = (event) => {console.log('onTakeShot', event.target.value)}

  const onPost = async () => {
    commentRef.current.text = message.current.value
    commentRef.current.videos = videos.map((video) => (video.url))
    commentRef.current.images = images
    // post /comments
    console.log('onPost: send ', commentRef.current)
    try {
      const response = await axios.post(`/comments?tms_id=${show_id}`, {
        comment: commentRef.current
      })
      commentRef.current = {
        text: '',
        images: [],
        videos: []
      }
      setVideos([])
      setImages([])
      message.current.value = ''
      console.log('response', response)
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
  const cardStyle = { px: isMobile ? 2.5 : 5, fontSize: '1.25rem' }

  return (
    <>
      <StyledCard>
        <CardHeader
          avatar={
            <Avatar src={image} alt="User-avatar" sx={{ width: size, height: size }} />
          }
          sx={{ px: isMobile ? 2.5 : 5 , pt: isMobile ? 1.875 : 3.75 }}
          title={
            <InputBase
              readOnly={!isAuth}
              fullWidth
              placeholder={ isAuth ? "Say something..." : "Only authorized users can add comments."}
              inputRef={message}
            />
          }
        />
        { images.length
          ? <UploadedMedia images={images} removeMedia={removeMedia} cardStyle={cardStyle} />
          : null
          }
        { videos.length
          ? <UploadedVideos videos={videos} removeVideo={removeVideo} cardStyle={cardStyle} />
          : null
        }
        <CardActions
          sx={isMobile ? { ...stackStyle, px: 2.5, pb: 1.875 } : { ...stackStyle, px: 5, pb: 3.75 }}
        >{ isMobile
          ? <MobileCardActions
            isAuth={isAuth}
            onAddHashtag={onAddHashtag}
            onAddPhoto={onAddPhoto}
            onTakeShot={onTakeShot}
            onAddVideo={onAddVideo}
            onAddGif={onAddGif}
            onPost={onPost}
            />
          : <DesktopCardActions
            isAuth={isAuth}
            onAddHashtag={onAddHashtag}
            onAddPhotosVideo={onAddPhotosVideo}
            onAddGif={onAddGif}
            onPost={onPost}
            />
          }
        </CardActions>
      </StyledCard>
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
  );
};
export default NewPostCard;
