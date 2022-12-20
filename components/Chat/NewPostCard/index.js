import { Avatar, CardActions, CardHeader, InputBase } from "@mui/material";
import { StyledCard, stackStyle, DesktopCardActions, MobileCardActions } from "./NewPostCard.styled";

const NewPostCard = (props) => {
  const { image, isMobile } = props;
  const size = isMobile ? 50 : 60;

  const onAddHashtag = (event) => {console.log('onAddHashtag', event.target.value)}  
  const onAddPhotosVideo = (event) => {console.log('onAddPhotosVideo', event.target.value)}
  const onAddGif = (event) => {console.log('onAddGif', event.target.value)}
  const onAddPhoto = (event) => {console.log('onAddPhoto', event.target.value)}
  const onAddVideo = (event) => {console.log('onAddVideo', event.target.value)}
  const onTakeShot = (event) => {console.log('onTakeShot', event.target.value)}

  const onPost = (values) => {console.log('onPost: send ', values)}

  return (
    <StyledCard>
      <CardHeader
        avatar={
          <Avatar src={image} alt="avatar" sx={{ width: size, height: size }} />
        }
        sx={{ px: isMobile ? 2.5 : 5 , pt: isMobile ? 1.875 : 3.75 }}
        title={
          <InputBase fullWidth placeholder="Say something..."/>
        }
      />
      <CardActions
        sx={isMobile ? { ...stackStyle, px: 2.5, pb: 1.875 } : { ...stackStyle, px: 5, pb: 3.75 }}
      >{ isMobile
        ? <MobileCardActions
          onAddHashtag={onAddHashtag}
          onAddPhoto={onAddPhoto}
          onTakeShot={onTakeShot}
          onAddVideo={onAddVideo}
          onAddGif={onAddGif}
          onPost={onPost}
          />
        : <DesktopCardActions
          onAddHashtag={onAddHashtag}
          onAddPhotosVideo={onAddPhotosVideo}
          onAddGif={onAddGif}
          onPost={onPost}
          />
        }
      </CardActions>
    </StyledCard>
  );
};
export default NewPostCard;
