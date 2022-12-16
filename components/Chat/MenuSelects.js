import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OutlinedSelect from "../OutlinedSelect";
import { Stack } from "@mui/system";

export const MenuSelects = () => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//Sort By
  const handleSeasonChange = () => {};

  const handleEpisodeChange = () => {};

  const handleSortChange = () => {};
  return (
    <Box
    // sx={{
    //   backgroundColor: theme.palette.background,
    //   minHeight: "20vh",
    // }}
    >
      <Stack direction='column' gap={2}>
        <OutlinedSelect
          selectList={["1", "2", "3"]}
          label="Select Season"
          id="selectSeason"
          handleChange={handleSeasonChange}
        />
        <OutlinedSelect
          selectList={["1", "2", "3", "4", "5", "6"]}
          label="Select Episode"
          id="selectEpisode"
          handleChange={handleEpisodeChange}
        />
        <OutlinedSelect
          selectList={["Genre", "Year", "Actor"]}
          label="Sort By"
          id="sortBy"
          handleChange={handleSortChange}
        />
      </Stack>
    </Box>
  );
};
