import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import OutlinedSelect from "../OutlinedSelect";
import { Stack } from "@mui/system";
import useAxios from "../../services/api";

function parsed(string) {
  const parsedInt = Number.parseInt(string, 10);
  if (Number.isNaN(parsedInt)) {
    return 0;
  }
  return parsedInt;
}

export const MenuSelects = ({
  tmsId,
  episodes,
  seasons,
  seriesId,
  onEpisodeSelect,
  onSortChange,
}) => {
  const { axios } = useAxios();
  const [season, setSeason] = useState("");
  const [episode, setEpisode] = useState("");
  const [episodesList, setEpisodesList] = useState([]);
  const [sort, setSort] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [noSelectedSeason, setNoSelectedSeason] = useState(false);
  
  // State for dynamically loaded series metadata
  const [totalSeasons, setTotalSeasons] = useState(parsed(seasons) || 0);
  const [totalEpisodes, setTotalEpisodes] = useState(parsed(episodes) || 0);
  const [effectiveSeriesId, setEffectiveSeriesId] = useState(seriesId || tmsId);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  
  // Use ref to prevent infinite loop
  const hasLoadedMetadata = useRef(false);
  const currentEpisodeTmsId = useRef(tmsId);

  // Season list derived from state
  const seasonsList = new Array(totalSeasons)
    .fill("0")
    .map((_, index) => ({ label: `Season ${index + 1}`, value: index + 1 }));
  
  const sortByList = [
    { label: "Recent", value: "recent" },
    { label: "Popularity", value: "popularity" },
  ];

  // UPDATED: Fetch series metadata using episodes endpoint
  useEffect(() => {
    const fetchSeriesMetadata = async () => {
      if (hasLoadedMetadata.current) {
        return;
      }

      const isEpisode = tmsId?.startsWith('EP');
      const hasSeriesId = seriesId && seriesId !== tmsId;
      const needsMetadata = parsed(seasons) === 0 && hasSeriesId && isEpisode;

      if (!needsMetadata) {
        hasLoadedMetadata.current = true;
        return;
      }

      console.log(`Loading metadata for series ${seriesId} (current episode: ${tmsId})`);
      setIsLoadingMetadata(true);
      hasLoadedMetadata.current = true;

      try {
        // Try backend episodes endpoint first 
        const { data: episodesResponse } = await axios.get(`/shows/${tmsId}/episodes`);
        
        const rawData = episodesResponse.episodes || episodesResponse;
        
        console.log('Episodes from backend:', rawData);

        let allEpisodes = [];
        let seasonsCount = 0;

        if (Array.isArray(rawData)) {
          allEpisodes = rawData;
          
          const uniqueSeasons = [...new Set(
            allEpisodes
              .map(ep => ep.season_number || ep.seasonNum || ep.season_num)
              .filter(sn => sn != null && sn > 0)
          )].sort((a, b) => a - b);
          
          seasonsCount = uniqueSeasons.length;
          console.log('Unique seasons found:', uniqueSeasons);
        }

        const episodesCount = allEpisodes.length;
        console.log(`Loaded from episodes endpoint: ${seasonsCount} seasons, ${episodesCount} episodes`);

        if (seasonsCount > 0) {
          setTotalSeasons(seasonsCount);
          setTotalEpisodes(episodesCount);
          // Use the numeric seriesId for Gracenote API calls
          setEffectiveSeriesId(seriesId);
        } else {
          console.warn('No seasons found, episodes may not be imported yet. Triggering import...');
          
          // Trigger import by calling the episode endpoint with import flag
          try {
            await axios.get(`/shows/${tmsId}?import_episodes=true`);
            console.log('Triggered episode import, please refresh page in a moment');
          } catch (error) {
            console.error('Could not trigger import:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setIsLoadingMetadata(false);
      }
    };

    fetchSeriesMetadata();
  }, [tmsId, seriesId, seasons, axios]);

  // Auto-fetch current episode's season and auto-select it
  useEffect(() => {
    const autoSelectCurrentEpisode = async () => {
      const isEpisode = tmsId?.startsWith('EP');
      
      if (!isEpisode || totalSeasons === 0 || !effectiveSeriesId) {
        return;
      }

      try {
        const { data: currentEpisodeData } = await axios.get(`/shows/${tmsId}`);
        
        if (currentEpisodeData && currentEpisodeData.seasonNum) {
          const currentSeason = currentEpisodeData.seasonNum;
          console.log(`Current episode is in season ${currentSeason}`);
          
          setSeason(currentSeason);
          
          //  effectiveSeriesId is the numeric seriesId which works with Gracenote API
          const { data: seasonEpisodes } = await axios.get(
            `data/v1.1/series/${effectiveSeriesId}/episodes?tms_id=${effectiveSeriesId}&season=${currentSeason}&titleLang=en&descriptionLang=en`
          );

          if (!Array.isArray(seasonEpisodes)) {
            console.error('Expected array of episodes, got:', typeof seasonEpisodes);
            return;
          }

          const totalTmsData = [];
          const episodesData = seasonEpisodes.map(
            ({ tmsId, episodeNum, episodeTitle }) => {
              totalTmsData.push(tmsId);
              return {
                value: tmsId,
                label: `${episodeNum} - ${episodeTitle}`,
              };
            }
          );
          
          setEpisodesList([
            { value: { tag: 'total', content: totalTmsData }, label: "Select All" },
            ...episodesData,
          ]);
          
          setEpisode(tmsId);
          setNoSelectedSeason(true);
          
          console.log(`Auto-selected episode ${tmsId} in season ${currentSeason} with ${episodesData.length} episodes`);
        }
      } catch (error) {
        console.error('Error auto-selecting current episode:', error);
      }
    };

    // Only run when we have the metadata loaded
    if (totalSeasons > 0 && !isLoadingMetadata && currentEpisodeTmsId.current === tmsId) {
      autoSelectCurrentEpisode();
      currentEpisodeTmsId.current = null; // Only auto-select once
    }
  }, [totalSeasons, isLoadingMetadata, tmsId, effectiveSeriesId, axios]);

  const handleSeasonChange = async (e) => {
    const seasonValue = e.target.value;
    setSeason(seasonValue);
    
    try {
      // Use the numeric seriesId which works with Gracenote
      const { data: episodes } = await axios.get(
        `data/v1.1/series/${effectiveSeriesId}/episodes?tms_id=${effectiveSeriesId}&season=${seasonValue}&titleLang=en&descriptionLang=en`
      );

      if (!Array.isArray(episodes)) {
        console.error('Expected array, got:', typeof episodes);
        return;
      }

      const totalTmsData = [];
      const episodesData = episodes.map(
        ({ tmsId, episodeNum, episodeTitle }) => {
          totalTmsData.push(tmsId);
          return {
            value: tmsId,
            label: `${episodeNum} - ${episodeTitle}`,
          };
        }
      );
      
      setEpisodesList([
        { value: { tag: 'total', content: totalTmsData }, label: "Select All" },
        ...episodesData,
      ]);
      setEpisode(null);
      setNoSelectedSeason(true);
    } catch (error) {
      console.error('Error fetching episodes for season:', error);
    }
  };

  const handleEpisodeChange = (e) => {
    setEpisode(e.target.value);
    onEpisodeSelect(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    onSortChange(e.target.value);
  };

  return (
    <>
      <Stack direction="column" gap={isMobile ? 1.25 : 2.5}>
        <OutlinedSelect
          selectList={seasonsList}
          label={isLoadingMetadata ? "Loading seasons..." : "Season Selector"}
          id="selectSeason"
          handleChange={handleSeasonChange}
          value={season}
          disabled={isLoadingMetadata || totalSeasons === 0}
        />
        {noSelectedSeason && (
          <OutlinedSelect
            selectList={episodesList}
            label="Select Episode"
            id="selectEpisode"
            handleChange={handleEpisodeChange}
            value={episode}
          />
        )}

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
