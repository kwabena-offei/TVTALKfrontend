import {
  Box,
  Button,
  ButtonBase,
  Card
} from "@mui/material";
import { OutlinedButton } from "../../OutlinedButton";
import { styled } from "@mui/system";
import CameraIcon from "../../Icons/CameraIcon";
import GaleryIcon from "../../Icons/GaleryIcon";
import HashtagIcon from "../../Icons/HashtagIcon";
import VideoIcon from "../../Icons/VideoIcon";
import GifIcon from "../../Icons/GifIcon";
import SendIcon from "../../Icons/SendIcon";

export const StyledCard = styled(
  Card,
  {}
)({
  borderRadius: "6px",
  backgroundColor: "#131B3F",
});

export const buttonDesktopStyle = {
  height: "50px",
  padding: "1em 2em",
};

export const buttonMobileStyle = {
  height: "40px",
  padding: "1em",
};

export const stackStyle = {
  flexDirection: "row",
  justifyItems: "flex-start",
  alignItems: "stretch"
};

const RoundedButton = styled(Button, {}) ({
  maxWidth: '40px',
  minWidth: '20px',
  maxHeight: '40px',
  minHeight: '20px',
  borderRadius: '50%',
  padding: '1em',
  boxShadow: 'none',
  '& .MuiSvgIcon-root': {
    fontSize: '1rem'
  }
})

export const RoundedIconButton = ({icon, children, ...props}) => {
  return (
    <Box width={40} height={40}>
      <RoundedButton variant='contained' sx={{ backgroundColor: 'background.default' }} {...props}>
        {icon}{children}
      </RoundedButton>  
    </Box>
  )
}

export const PostIconButton = ({...props}) => {
  return (
    <RoundedButton variant='contained' {...props}>
      <SendIcon />
    </RoundedButton>
  )
}
export const PostButton = ({ onClick, title, sx, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        boxShadow: "none",
        ...buttonDesktopStyle,
        ...sx
      }}
      onClick={onClick}
      {...props}
    >
      {title}
    </Button>
  )
}

export const DesktopCardActions = ({
  onAddHashtag,
  onAddPhotosVideo,
  onAddGif,
  onPost,
  isAuth
}) => {
  return (
    <>
      <OutlinedButton sx={buttonDesktopStyle} onClick={onAddHashtag}disabled={!isAuth}>
        Add #
      </OutlinedButton>
      <OutlinedButton sx={buttonDesktopStyle} onClick={onAddPhotosVideo}disabled={!isAuth}>
        Add photos/videos
      </OutlinedButton>
      <OutlinedButton sx={buttonDesktopStyle} onClick={onAddGif}disabled={!isAuth}>
        Add GIF
      </OutlinedButton>
      <Box ml="auto!important">
        <PostButton onClick={onPost} title='Post' disabled={!isAuth} />
      </Box>
      
    </>
  );
};

export const MobileCardActions = ({
  onAddHashtag,
  onAddPhoto,
  onTakeShot,
  onAddVideo,
  onAddGif,
  onPost,
  isAuth
}) => {
  return (
    <>
      <RoundedIconButton color='darkSecondary' onClick={onAddHashtag} icon={<HashtagIcon />} disabled={!isAuth}/>
      <RoundedIconButton color='darkSecondary' onClick={onAddPhoto} icon={<GaleryIcon />}disabled={!isAuth}/>
      <RoundedIconButton color='darkSecondary' onClick={onTakeShot} icon={<CameraIcon />}disabled={!isAuth}/>
      <RoundedIconButton color='darkSecondary' icon={<VideoIcon />} disabled={!isAuth} component="label">
        <input hidden accept="video/*" type='file' onChange={onAddVideo}/>
      </RoundedIconButton>
      <RoundedIconButton color='darkSecondary' onClick={onAddGif} icon={<GifIcon />} disabled={!isAuth}/>
      <Box width={40} height={40} ml='auto!important'>
        <PostIconButton
          color="primary"
          onClick={onPost}
          disabled={!isAuth}/>  
      </Box>
    </>
  );
};
export const StyledBadgeButton = styled(ButtonBase)({
  height: "24px",
  width: "24px",
  borderRadius: "50%",
  backgroundColor: "rgb(222 222 222 / 50%)",
  color: "#000",
});

export const imageStyleProps = {
  minWidth: "30px",
  minHeight: "30px",
  maxHeight: "60px",
  maxWidth: "60px",
  height: "fit-content",
  width: "fit-content",
  borderRadius: "6px",
};