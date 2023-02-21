import { Stack, Link, Button, styled } from "@mui/material";
import { useRouter } from "next/router";
import {
  ButtonBackMobile,
  MobileTitle,
} from "../AccountSettingsLayout/AccountSettingsLayout.styled";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import ShareIcon from "../Icons/ShareIcon";
import IconButton from "../OutlinedRoundIconButton";
import MessagesIcon from "../Icons/MessagesIcon";

const StyledButton = styled(Button) ({
  fontSize: '0,875rem',
  paddingLeft: '15px',
  paddingRight: '15px'
})

export const MobileHeader = ({ source, url }) => {
  const router = useRouter();

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2} my={2} >
        <ButtonBackMobile onClick={() => router.back()} />
        <MobileTitle>{source}</MobileTitle>
      </Stack>
      <Stack direction="row" justifyContent='space-between' mb={2.25}>
        <Link
          component={StyledButton}
          href={url}
          target='_blank'
          underline='none'
          sx={{ backgroundColor: '#131B3F'}}
        >{source}</Link>
        <Stack direction="row" gap={1.25}>
          <IconButton icon={<FavoriteBorderOutlined />} />
          <IconButton icon={<MessagesIcon />} />
          <IconButton icon={<ShareIcon />} />
        </Stack>
      </Stack>
    </>
  );
};
