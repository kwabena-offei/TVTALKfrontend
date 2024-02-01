import React, { useState } from 'react';
import CustomSelect from './CustomSelect';
import useAxios from "../services/api";

const SeasonEpisodeSelector = ({ tmsId, totalSeasons }) => {
  const { axios } = useAxios();
  const seasonList = Array.from({ length: parseInt(totalSeasons) }, (_, i) => {
    return {
      value: i + 1,
      label: `Season ${i + 1}`
    }
  });

  const [season, setSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [episode, setEpisode] = useState(null);
  const [noSelectedSeason, setNoSelectedSeason] = useState(false);

  const handleSeasonChange = async (event) => {
    setSeason(event.target.value);
    const { data: episodes } = await axios.get(`data/v1.1/series/${tmsId}/episodes?tms_id=${tmsId}&season=${season}&titleLang=en&descriptionLang=en`);


    const episodeList = episodes.map(({ tmsId, episodeNum, episodeTitle }) => {
      return {
        value: tmsId,
        label: `${episodeNum} - ${episodeTitle}`
      }
    });
    setEpisodes(episodeList);
    setEpisode(episodeList[0]);
    setNoSelectedSeason(true);
  }

  const handleEpisodeChange = (event) => {
    setEpisode(event.target.value);
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
      {noSelectedSeason? <><CustomSelect
        selectList={episodes}
        label='Select Episode'
        labelId='selectEpisode'
        selectId='selectEpisode'
        handleChange={handleEpisodeChange}
      /></>: <div style={{width: '100%'}}></div>}
    </>
  );
}

export default SeasonEpisodeSelector;