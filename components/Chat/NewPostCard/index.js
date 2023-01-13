import { Avatar, CardActions, CardHeader, InputBase } from "@mui/material";
import { StyledCard, stackStyle, DesktopCardActions, MobileCardActions } from "./NewPostCard.styled";
import { useContext } from "react";
import { AuthContext } from '../../../util/AuthContext'

const NewPostCard = (props) => {
  const { isMobile, profile } = props;
  const isAuth = useContext(AuthContext);
  const { image } = profile | ''
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
          <Avatar src={image} alt="User-avatar" sx={{ width: size, height: size }} />
        }
        sx={{ px: isMobile ? 2.5 : 5 , pt: isMobile ? 1.875 : 3.75 }}
        title={
          <InputBase readOnly={!isAuth} fullWidth placeholder={ isAuth ? "Say something..." : "Only authorized users can add comments."}/>
        }
      />
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
  );
};
export default NewPostCard;
