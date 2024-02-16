import { useContext } from "react";
import { AuthContext } from "../../util/AuthContext";
import router from "next/router";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Stack,
  Box,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/system";
import LightFavoriteButton from "./FavoriteLightButton";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import DarkButton from "./DarkRoundedTextButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledCard = styled(Card, {
  name: "Favorite",
  slot: "custom-card",
})({
  backgroundColor: "#131B3F",
  borderRadius: "6px",
});

const FavoriteCard = ({ tvShow, fetchFavorites, mutateProfile }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { id, image, title, tmsId } = tvShow;

  const { toggleFavorite } = useContext(AuthContext);

  const handleClick = async () => {
    toggleFavorite({ identifier: { tmsId: tvShow.tmsId }, liked: false });
    mutateProfile();
    fetchFavorites();
  };

  const handleAbout = () => {
    router.push(`/programs/${tmsId}/about`);
  };

  const handleChat = () => {
    router.push(`/chat/${tmsId}`);
  };

  return (
    <StyledCard key={`favorite-show-${id}`}>
      <CardMedia
        component="img"
        image={`https://${image}`}
        height={240}
        width={360}
      />
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
            onClick={handleChat}
          >
            <Typography variant={isMobile ? "body2" : "body1"}>Chat</Typography>
          </Button>
          <DarkButton size="small" onClick={handleAbout}>
            <Typography variant={isMobile ? "body2" : "body1"}>
              About
            </Typography>
          </DarkButton>

          <Box>
            <LightFavoriteButton
              onClick={handleClick}
              size="small"
              icon={<FavoriteIcon fontSize="small" htmlColor="#919CC0" />}
            />
          </Box>
        </Stack>
      </CardActions>
    </StyledCard>
  );
};

export default FavoriteCard;
