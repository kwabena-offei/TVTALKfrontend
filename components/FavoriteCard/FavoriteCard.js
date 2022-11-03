import {
  Button,
  Card,
  Grid,
  CardContent,
  Typography,
  CardMedia,
  Stack
} from "@mui/material";
import { styled } from "@mui/system";
import IconButton from "../ReactionCard/RoundedIconButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';

const StyledCard = styled(Card, {
  name: "Favorite",
  slot: "custom-card"
}) ({
  backgroundColor: '#131B3F',
  borderRadius: '8px',
})

const FavoriteCard = ({ tvShow, ...props }) => {
  const { id, image, title, tmsId } = tvShow;

  const handleAbout = () => {
    console.log("handleAbout", tmsId)
  }

  return (
    <StyledCard key={`favorite-show-${id}`}>
      <CardMedia component="img" image={image} height={240} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
        >
          {title}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
              variant="contained"
              color="primary"
              sx={{ boxShadow: 'none'}}
            >
              Chat
            </Button>
            <Button
            size="small"
              onClick={handleAbout}
              variant="dark"
            >
              About
            </Button>
            <IconButton size="small" icon={<FavoriteBorderIcon />} />
        </Stack>
      </CardContent>
    </StyledCard>
  );
}

export default FavoriteCard;