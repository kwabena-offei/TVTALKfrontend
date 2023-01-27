import { Avatar, CardActions, CardContent, CardHeader, CardMedia, InputBase, Badge, IconButton, Button } from "@mui/material";
import { StyledCard, stackStyle, DesktopCardActions, MobileCardActions, StyledBadgeButton, imageStyleProps } from "./NewPostCard.styled";
import { useContext, useRef, useState } from "react";
import { AuthContext } from '../../../util/AuthContext'
import useAxios from "../../../services/api";
import SearchGif from "../AddGiff";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";

const NewPostCard = (props) => {
  const { isMobile, profile, show_id, story_id } = props;
  const isAuth = useContext(AuthContext);
  const { image } = profile | ''
  const size = isMobile ? 50 : 60;
  const [openGiff, setOpenGiff] = useState(false)
  const toggleGiff = () => setOpenGiff(!openGiff)
  // const [comment, setComment] = useState("")
  const { axios } = useAxios()
  const message = useRef()
  const commentRef = useRef({
    text: '',
    // show_id: show_id ? show_id : null,
    // story_id: story_id ? story_id : null,
    images: [],
    videos: [],
    // mute_notifications: true
  })
  const [commentMedia, setCommentMedia] = useState({
    images: [],
    videos: []
  })

  const onAddHashtag = (event) => {console.log('onAddHashtag', event.target.value)}  
  const onAddPhotosVideo = (event) => {
    console.log('onAddPhotosVideo', event.target.value)
    // commentRef.current.images = [ ...commentRef.current.images, secondImage ]
    // console.log('onAddPhoto', commentRef.current)
  }
  const onAddGif = () => {
    toggleGiff()
    console.log('onAddGif', commentRef.current)
  }
  const onAddPhoto = (event) => {console.log('onAddPhoto', event.target.value)}
  const onAddVideo = (event) => {console.log('onAddVideo', event.target.value)}
  const onTakeShot = (event) => {console.log('onTakeShot', event.target.value)}

  const onPost = async (values) => {
    commentRef.current.text = message.current.value
    // post /comments
    console.log('onPost: send ', commentRef.current)
    try {
      const response = await axios.post(`/comments?tms_id=${show_id}`, {
        comment: commentRef.current
      })
      console.log('response', response)
    } catch (error) {
      console.log('post error', error)
    }

  }
  const onGifClick = (objURL) => {
    // console.log('url', objURL.images.original.url)
    const newValue = objURL.images.original.url
    commentRef.current.images = [ ...commentRef.current.images, newValue ]
    setCommentMedia({
      ...commentMedia,
      images: [
        ...commentMedia.images,
        newValue
      ]
    })
    toggleGiff()
  }

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
        { commentMedia.images.length
          ? <CardContent sx={{ px: isMobile ? 2.5 : 5, fontSize: '1.25rem' }}>
              <Box display='flex' flexDirection='row' justifyContent='flex-start' rowGap={2} columnGap={3} flexWrap='wrap' >
              {commentMedia.images.map((image, index) => (
                <Badge
                  key={`${image}-mini-${index}`}
                  color='default'
                  badgeContent={
                    // ToDo: add remove item function
                    <StyledBadgeButton>
                      <Close fontSize='1rem'/>
                    </StyledBadgeButton>
                  }
                >
                  <CardMedia
                    sx={imageStyleProps}
                    image={image}
                    component="img"
                    alt="gif"
                  />
                  </Badge>
              ))}
              </Box>
            </CardContent>
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
    </>
  );
};
export default NewPostCard;
