import React, { useState } from 'react';
import CustomSelect from './CustomSelect';
import useAxios from "../services/api";
import Link from 'next/link';
import { useRouter } from 'next/router';

const SeasonEpisodeSelector = ({ tmsId, totalSeasons }) => {
  const { axios } = useAxios();
  const router = useRouter();
  const seasonList = Array.from({ length: parseInt(totalSeasons) }, (_, i) => {
    return {
      value: i + 1,
      label: `Season ${i + 1}`
    }
  });

  const [season, setSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [episode, setEpisode] = useState(null);

  const handleSeasonChange = async (event) => {
    const season = event.target.value;
    setSeason(season);
    const { data: episodes } = await axios.get(`data/v1.1/series/${tmsId}/episodes?tms_id=${tmsId}&season=${season}&titleLang=en&descriptionLang=en`);


    const episodeList = episodes.map(({ tmsId, episodeNum, episodeTitle }) => {
      return {
        value: tmsId,
        label: `${episodeNum} - ${episodeTitle}`
      }
    });
    setEpisodes(episodeList);
    setEpisode(episodeList[0]);
  }

  const handleEpisodeChange = (event) => {
    const episode = event.target.value;
    setEpisode(episode);
  }

  return (
    <>
      <CustomSelect
        selectList={seasonList}
        label='Select Season'
        labelId='selectSeason'
        selectId='selectSeason'
        handleChange={handleSeasonChange}
      />
      <CustomSelect
        selectList={episodes}
        label='Select Episode'
        labelId='selectEpisode'
        selectId='selectEpisode'
        handleChange={handleEpisodeChange}
      />
    </>
  );
}

export default SeasonEpisodeSelector;