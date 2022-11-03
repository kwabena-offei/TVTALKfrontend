import {
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Stack,
  Box,
  CardActions
} from "@mui/material";
import { styled } from "@mui/system";
import IconButton from "./FavoriteButton";
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';

const StyledCard = styled(Card, {
  name: "Favorite",
  slot: "custom-card"
}) ({
  backgroundColor: '#131B3F',
  borderRadius: '6px'
})

const StyledButton = styled(Button, {
  name: "Favorite",
  slot: "custom-button"
}) ({
  paddingLeft: '1.15vw',
  paddingRight: '1.15vw'
})

const FavoriteCard = ({ tvShow, ...props }) => {
  const { id, image, title, tmsId } = tvShow;

  const handleAbout = () => {
    console.log("handleAbout", tmsId)
  }

  return (
    <StyledCard key={`favorite-show-${id}`}>
      <CardMedia component="img" image={image} height={240} width={360} />
      <CardContent sx={{paddingX: 2.5, paddingTop: 1.5, paddingBottom: 0.75}}>
        <Typography
          // gutterBottom
          variant="h6"
          component="div"
        >
          {title}
        </Typography>
        </CardContent>
        <CardActions sx={{paddingX: 2.5, paddingTop: 0.75, paddingBottom: 2.5}}>
        <Stack direction="row" spacing={1.25}>
            <StyledButton
              size="small"
              variant="contained"
              color="primary"
              sx={{ boxShadow: 'none'}}
            >
              <Typography variant='body1'>Chat</Typography>
            </StyledButton>
            <StyledButton
              size="small"
              onClick={handleAbout}
              variant="dark"
            >
              <Typography variant='body1'>About</Typography>
            </StyledButton>
            <Box>
              <IconButton size="small" icon={<FavoriteIcon fontSize="small" />} />
            </Box>
        </Stack>
        </CardActions>
    </StyledCard>
  );
}

export default FavoriteCard;