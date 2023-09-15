import { useState } from "react";
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
import DarkFavoriteButton from "./FavoriteDarkButton";
import LightFavoriteButton from './FavoriteLightButton';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DarkButton from "./DarkRoundedTextButton";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledCard = styled(Card, {
  name: "Favorite",
  slot: "custom-card"
})({
  backgroundColor: '#131B3F',
  borderRadius: '6px'
})

const FavoriteCard = ({ tvShow, favorites, ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id, image, title, tmsId } = tvShow;

  const [isFavorite, setIsFavorite] = useState(false)
  const toggleIsFavorite = () => setIsFavorite(!isFavorite)

  const handleClick = async () => {
    // ToDo: add callback to endpoint
    await console.log('change this handle click - id:', id)
    toggleIsFavorite()
  }

  const handleAbout = () => {
    console.log("handleAbout", tmsId)
  }

  return (
    <StyledCard key={`favorite-show-${id}`}>
      <CardMedia component="img" image={image} height={240} width={360} />
      <CardContent sx={{ paddingX: 2.5, paddingTop: 1.5, paddingBottom: 0.75 }}>
        <Typography
          // gutterBottom
          variant="h6"
          component="div"
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions sx={{ paddingX: 2.5, paddingTop: 0.75, paddingBottom: 2.5 }}>
        <Stack direction="row" spacing={1.25}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{ boxShadow: "none", paddingX: "1.15vw" }}
          >
            <Typography variant={isMobile ? "body2" : "body1"}>Chat</Typography>
          </Button>
          <DarkButton size="small" onClick={handleAbout}>
            <Typography variant={isMobile ? "body2" : "body1"}>
              About
            </Typography>
          </DarkButton>
          <Box>
            {isFavorite ? (
              <LightFavoriteButton
                onClick={handleClick}
                size="small"
                icon={<FavoriteIcon fontSize="small" />}
              />
            ) : (
              <DarkFavoriteButton
                onClick={handleClick}
                size="small"
                icon={<FavoriteIcon fontSize="small" />}
              />
            )}
          </Box>
        </Stack>
      </CardActions>
    </StyledCard>
  );
}

export default FavoriteCard;