import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from '@mui/material'
import OutlinedSelect from "../OutlinedSelect";
import { Stack } from "@mui/system";
import useAxios from "../../services/api";

function parsed(string) {
  const parsedInt = Number.parseInt(string, 10)
  if (parsedInt === NaN) {
    return 0
  };
  return parsedInt;
}

export const MenuSelects = ({ tmsId, episodes, seasons, onEpisodeSelect, onSortChange }) => {
  const { axios } = useAxios();
  const [season, setSeason] = useState('')
  const [episode, setEpisode] = useState('')
  const [episodesList, setEpisodesList] = useState([])
  const [sort, setSort] = useState('')
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [noSelectedSeason, setNoSelectedSeason] = useState(false);

  const totalEpisodes = parsed(episodes) || 0;
  const totalSeasons = parsed(seasons) || 0;
  const seasonsList = new Array(totalSeasons).fill('0').map((_, index) => ({ label: `Season ${index + 1}`, value: index + 1 }));
  const sortByList = [{ label: 'Recent', value: 'recent' }, { label: 'Popularity', value: 'popularity' }];

  const handleSeasonChange = async (e) => {
    const season = e.target.value;
    setSeason(season);
    const { data: episodes } = await axios.get(`data/v1.1/series/${tmsId}/episodes?tms_id=${tmsId}&season=${season}&titleLang=en&descriptionLang=en`);


    const episodesData = episodes.map(({ tmsId, episodeNum, episodeTitle, onEpisodeSelect }) => {
      return {
        value: tmsId,
        label: `${episodeNum} - ${episodeTitle}`
      }
    });
    setEpisodesList(episodesData);
    setEpisode(null);
    setNoSelectedSeason(true);
  };

  const handleEpisodeChange = (e) => {
    setEpisode(e.target.value);
    onEpisodeSelect(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value)
    onSortChange(e.target.value)
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
        {noSelectedSeason ? <><OutlinedSelect
          selectList={episodesList}
          label="Select Episode"
          id="selectEpisode"
          handleChange={handleEpisodeChange}
          value={episode}
        /></> : <></>}
        
        {/* <OutlinedSelect
          selectList={sortByList}
          label="Sort By"
          id="sortBy"
          handleChange={handleSortChange}
          value={sort}
        /> */}
      </Stack>
    </>
  );
};
