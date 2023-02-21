import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import {
  ButtonBackMobile,
  MobileTitle,
} from "../AccountSettingsLayout/AccountSettingsLayout.styled";

const MobileHeader = ({ source }) => {
  const router = useRouter();

  return (
    <Stack direction="row" alignItems="center" spacing={2} my={2}>
      <ButtonBackMobile onClick={() => router.back()} />
      <MobileTitle>{source}</MobileTitle>
    </Stack>
  );
};
export default MobileHeader;
