import { Stack, Box, Link } from "@mui/material";
import { useRouter } from "next/router";
import { NewsMainContainer } from "../NewsCard/NewsCard.styled";
import {
  ButtonBackMobile,
  MobileTitle,
} from "../AccountSettingsLayout/AccountSettingsLayout.styled";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import ShareIcon from "../Icons/ShareIcon";
import IconButton from "../OutlinedRoundIconButton";
import MessagesIcon from "../Icons/MessagesIcon";

export const MobileHeader = ({ source, url }) => {
  const router = useRouter();

  return (
    <NewsMainContainer maxWidth="xl">
      <Stack direction="row" alignItems="center" spacing={2} my={2} >
        <ButtonBackMobile onClick={() => router.back()} />
        <MobileTitle>{source}</MobileTitle>
      </Stack>
      <Stack direction="row" justifyContent='space-between' mb={2.25}>
        <Box sx={{ display: 'flex', flexDirection: 'column', paddingX: '15px', height: '40px', backgroundColor: '#131B3F', borderRadius: 50 }} justifyContent='center' alignContent='center' >
          <Link href={url} target="_blank" sx={{ fontSize: '14px'}} underline='none' >
            {source}
          </Link>
        </Box>
        <Stack direction="row" gap={1.25}>
          <IconButton icon={<FavoriteBorderOutlined />} />
          <IconButton icon={<MessagesIcon />} />
          <IconButton icon={<ShareIcon />} />
        </Stack>
      </Stack>
    </NewsMainContainer>
  );
};
