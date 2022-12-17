import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from '@mui/material'
import OutlinedSelect from "../OutlinedSelect";
import { Stack } from "@mui/system";

export const MenuSelects = () => {
  const [season, setSeason] = useState('')
  const [episode, setEpisode] = useState('')
  const [sort, setSort] = useState('')
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSeasonChange = (e) => {
    setSeason(e.target.value)
  };

  const handleEpisodeChange = (e) => {
    setEpisode(e.target.value)
  };

  const handleSortChange = (e) => {
    setSort(e.target.value)
  };

  return (
    <>
      <Stack direction='column' gap={isMobile ? 1.25 : 2.5}>
        <OutlinedSelect
          selectList={["1", "2", "3"]}
          label="Select Season"
          id="selectSeason"
          handleChange={handleSeasonChange}
          value={season}
        />
        <OutlinedSelect
          selectList={["1", "2", "3", "4", "5", "6"]}
          label="Select Episode"
          id="selectEpisode"
          handleChange={handleEpisodeChange}
          value={episode}
        />
        <OutlinedSelect
          selectList={["Genre", "Year", "Actor"]}
          label="Sort By"
          id="sortBy"
          handleChange={handleSortChange}
          value={sort}
        />
      </Stack>
    </>
  );
};
