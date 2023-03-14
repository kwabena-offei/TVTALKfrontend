"use client";

import { Box } from "@mui/material";

export const IFrameComponent = ({ url }) => (
  <Box sx={{ flexGrow: 1 }}>
    <iframe src={url} width="100%" className="iframe-style"></iframe>
  </Box>
);
