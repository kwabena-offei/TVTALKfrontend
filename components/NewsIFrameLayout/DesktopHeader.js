import { Stack, Box, Link } from "@mui/material";
import { useRouter } from "next/router";
import { ButtonBack } from "../AccountSettingsLayout/AccountSettingsLayout.styled";
import { DesktopTitle } from "./NewsIFrameLayout.styled";
import { FavoriteBorderOutlined, Favorite, FavoriteRounded } from "@mui/icons-material";
import ShareIcon from "../Icons/ShareIcon";
import IconButton from "../OutlinedRoundIconButton";
import MessagesIcon from "../Icons/MessagesIcon";

export const DesktopHeader = ({ source, url, onComment, onLike, onShare, isLiked }) => {
  const router = useRouter();

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 5 }}>
        <ButtonBack onClick={() => router.back()} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: 0
          }}
        >
          <DesktopTitle>{source}</DesktopTitle>
          <Box>
            <Link href={url.href} target="_blank" sx={{ fontSize: '1rem', fontWeight: 600 }}>
              {url.origin}
            </Link>
          </Box>
        </Box>
        <Stack direction="row" gap={1.25}>
          <IconButton
            onClick={onLike}
            icon={ isLiked ? <FavoriteRounded /> : <FavoriteBorderOutlined />}
            // sx={{
            //   backgroundColor: isLiked ? 'neutral.contrastText' : 'neutral.main',
            //   color: isLiked ? 'neutral.main' : 'neutral.contrastText'
            // }}
          />
          <IconButton onClick={onComment} icon={<MessagesIcon />} />
          <IconButton onClick={onShare} icon={<ShareIcon />} />
        </Stack>
      </Stack>
    </>
  );
};
