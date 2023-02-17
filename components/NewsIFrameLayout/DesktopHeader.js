import { Stack, Box, Link } from "@mui/material";
import { useRouter } from "next/router";
import { ButtonBack } from "../AccountSettingsLayout/AccountSettingsLayout.styled";
import { DesktopTitle } from "./NewsIFrameLayout.styled";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import ShareIcon from "../Icons/ShareIcon";
import IconButton from "../OutlinedRoundIconButton";
import MessagesIcon from "../Icons/MessagesIcon";

export const DesktopHeader = ({ source, url }) => {
  const router = useRouter();
  const BUTTON_WIDTH = "115px";

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
            <Link href={url} target="_blank">
              {source}
            </Link>
          </Box>
        </Box>
        <Stack direction="row" gap={1.25}>
          <IconButton icon={<FavoriteBorderOutlined />} />
          <IconButton icon={<MessagesIcon />} />
          <IconButton icon={<ShareIcon />} />
        </Stack>
      </Stack>
    </>
  );
};
