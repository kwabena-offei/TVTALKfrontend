import { useTheme, useMediaQuery } from "@mui/material";
import { MobileHeader } from "./MobileHeader";
import { DesktopHeader } from "./DesktopHeader";

export const NewsIFrameLayout = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return <MobileHeader {...props} />;
  }

  return <DesktopHeader {...props} />;
};
