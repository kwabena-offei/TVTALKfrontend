import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from '@mui/material'
import OutlinedSelect from "../OutlinedSelect";
import { Stack } from "@mui/system";

function parsed(string) {
  const parsedInt = Number.parseInt(string, 10)
  if (parsedInt === NaN) {
    return 0
  };
  return parsedInt;
}

export const MenuSelects = ({ episodes, seasons }) => {
  const [season, setSeason] = useState('')
  const [episode, setEpisode] = useState('')
  const [sort, setSort] = useState('')
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const totalEpisodes = parsed(episodes) || 0;
  const totalSeasons = parsed(seasons) || 0;
  const episodesList = new Array(totalEpisodes).fill('0').map((_, index) => (`${index + 1}`))
  const seasonsList = new Array(totalSeasons).fill('0').map((_, index) => (`${index + 1}`))
  const sortByList = ['Season', 'Episode']

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
          selectList={seasonsList}
          label="Select Season"
          id="selectSeason"
          handleChange={handleSeasonChange}
          value={season}
        />
        <OutlinedSelect
          selectList={episodesList}
          label="Select Episode"
          id="selectEpisode"
          handleChange={handleEpisodeChange}
          value={episode}
        />
        <OutlinedSelect
          selectList={sortByList}
          label="Sort By"
          id="sortBy"
          handleChange={handleSortChange}
          value={sort}
        />
      </Stack>
    </>
  );
};
