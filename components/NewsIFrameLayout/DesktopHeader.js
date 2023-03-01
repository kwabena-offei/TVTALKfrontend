import { Stack, Box, Link, Container } from "@mui/material";
import { useRouter } from "next/router";
import { ButtonBack } from "../AccountSettingsLayout/AccountSettingsLayout.styled";
import { DesktopTitle } from "./NewsIFrameLayout.styled";
import {
  FavoriteBorderOutlined,
  FavoriteRounded,
} from "@mui/icons-material";
import ShareIcon from "../Icons/ShareIcon";
import IconButton from "../OutlinedRoundIconButton";
import MessagesIcon from "../Icons/MessagesIcon";
import { useContext } from "react";
import { AuthContext } from "../../util/AuthContext";

export const DesktopHeader = ({
  source,
  url,
  onComment,
  onLike,
  onShare,
  isLiked,
}) => {
  const router = useRouter();
  const isAuth = useContext(AuthContext)

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ my: 5 }}
      >
        <Container disableGutters>
          <ButtonBack onClick={() => router.back()} />
        </Container>
        <Container disableGutters>
          <DesktopTitle component="h2">{source}</DesktopTitle>
          <Box sx={{ textAlign: "center" }}>
            <Link
              href={url.href}
              target="_blank"
              sx={{ fontSize: "1rem", fontWeight: 600 }}
            >
              {url.origin}
            </Link>
          </Box>
        </Container>
        <Container disableGutters>
          <Stack direction="row" gap={1.25} justifyContent="flex-end">
            <IconButton
              onClick={onLike}
              disabled={!isAuth}
              icon={isLiked ? <FavoriteRounded /> : <FavoriteBorderOutlined />}
            />
            <IconButton onClick={onComment} icon={<MessagesIcon />} />
            <IconButton onClick={onShare} icon={<ShareIcon />} />
          </Stack>
        </Container>
      </Stack>
    </>
  );
};
