import { Avatar, Button, Card, CardActions, CardHeader, InputBase } from "@mui/material";
import { OutlinedButton } from "../OutlinedButton";
import { styled } from '@mui/system';
import CameraIcon from "../Icons/CameraIcon";

const StyledCard = styled(Card, {}) ({
  borderRadius: '6px',
  backgroundColor: '#131B3F'
})
const NewPostCard = (props) => {
  const { image, isMobile } = props;
  const size = isMobile ? 50 : 60;
  const buttonDesctopStyle = {
    height: "50px",
    padding: "1rem 2rem",
  };
  const buttonMobileStyle = {
    height: '40px',
    padding: "1rem 1.5rem",
  }
  const stackStyle = {
    flexDirection: "row",
    justifyItems: "flex-start",
    alignItems: "stretch",
    px: 5,
    pb: 3.75,
  }
  const styleSXbutton = isMobile ? buttonMobileStyle : buttonDesctopStyle
  // const icon = <CameraIcon />;

  return (
    <StyledCard>
      <CardHeader
        avatar={
          <Avatar src={image} alt="avatar" sx={{ width: size, height: size }} />
        }
        sx={{ px: 5, pt: 3.75 }}
        title={
          <InputBase fullWidth placeholder="Say something..."/>
        }
      />
      <CardActions
        sx={stackStyle}
      >
        <OutlinedButton sx={styleSXbutton}>Add #</OutlinedButton>
        <OutlinedButton
          sx={styleSXbutton}>
            Add photos/videos
          </OutlinedButton>
        <OutlinedButton sx={styleSXbutton}>Add GIF</OutlinedButton>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginLeft: "auto!important",
            boxShadow: "none",
            ...styleSXbutton,
          }}
        >
          Post
        </Button>
      </CardActions>
    </StyledCard>
  );
};
export default NewPostCard;
