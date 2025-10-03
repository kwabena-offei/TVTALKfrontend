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
  const [effectiveSeriesId, setEffectiveSeriesId] = useState(seriesId);
  const [parentTmsId, setParentTmsId] = useState(null);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [currentEpisodeSeason, setCurrentEpisodeSeason] = useState(null);
  
  // Use ref to prevent re-running effects
  const hasLoadedMetadata = useRef(false);
  const hasAutoSelected = useRef(false);

  // Season list derived from totalSeasons
  const seasonsList = new Array(totalSeasons)
    .fill("0")
    .map((_, index) => ({ label: `Season ${index + 1}`, value: index + 1 }));
  
  const sortByList = [
    { label: "Recent", value: "recent" },
    { label: "Popularity", value: "popularity" },
  ];

  // Fetch show/episode metadata from backend
  useEffect(() => {
    const fetchMetadata = async () => {
      if (hasLoadedMetadata.current || !tmsId) {
        return;
      }

      const isEpisode = tmsId?.startsWith('EP');
      const isShow = tmsId?.startsWith('SH');
      const hasSeasons = parsed(seasons) > 0;

      // If it's a show with seasons already known, use those values
      if (isShow && hasSeasons) {
        console.log(`Using existing metadata: ${seasons} seasons`);
        setParentTmsId(tmsId); // For shows, use tmsId
        setEffectiveSeriesId(seriesId);
        hasLoadedMetadata.current = true;
        return;
      }

      // For episodes without seasons or shows without metadata, fetch from backend
      const needsMetadata = (isEpisode && !hasSeasons) || (isShow && !hasSeasons);
      if (!needsMetadata) {
        hasLoadedMetadata.current = true;
        return;
      }

      console.log(`Fetching metadata for ${tmsId}...`);
      setIsLoadingMetadata(true);
      hasLoadedMetadata.current = true;

      try {
        // Call backend - this will import episode + parent show and trigger background import
        const { data: showData } = await axios.get(`/shows/${tmsId}`);
        
        console.log('Show data from backend:', showData);

        // Set effectiveSeriesId
        if (showData.effectiveSeriesId || showData.seriesId) {
          setEffectiveSeriesId(showData.effectiveSeriesId || showData.seriesId);
        }
        
        // Set parentTmsId if available (might be null if parent not imported yet)
        if (showData.parentTmsId) {
          setParentTmsId(showData.parentTmsId);
        }
        
        // Set seasons/episodes if available
        const seasonsCount = showData.totalSeasons || 0;
        const episodesCount = showData.totalEpisodes || 0;
        
        setTotalSeasons(seasonsCount);
        setTotalEpisodes(episodesCount);
        
        // For episodes, capture season number for auto-selection
        if (isEpisode && showData.seasonNum) {
          setCurrentEpisodeSeason(showData.seasonNum);
        }
        
        console.log(`Loaded: parentTmsId=${showData.parentTmsId}, effectiveSeriesId=${showData.effectiveSeriesId || showData.seriesId}, totalSeasons=${seasonsCount}`);
        
      } catch (error) {
        console.error('Error fetching metadata:', error);
      } finally {
        setIsLoadingMetadata(false);
      }
    };

    fetchMetadata();
  }, [tmsId, seasons, seriesId, axios]);

  // Auto-select current episode's season after metadata loads
  useEffect(() => {
    const autoSelectSeason = async () => {
      // Need either parentTmsId or effectiveSeriesId to fetch episodes
      const episodesFetchId = parentTmsId || effectiveSeriesId;
      
      if (hasAutoSelected.current || !currentEpisodeSeason || !episodesFetchId) {
        return;
      }

      console.log(`Auto-selecting season ${currentEpisodeSeason} for episode ${tmsId}, using ID: ${episodesFetchId}`);
      hasAutoSelected.current = true;

      try {
        // Fetch episodes using parentTmsId (if available) or effectiveSeriesId (fallback)
        const { data: seasonEpisodes } = await axios.get(
          `/shows/${episodesFetchId}/episodes?season=${currentEpisodeSeason}`
        );

        if (!Array.isArray(seasonEpisodes)) {
          console.error('Expected array of episodes, got:', typeof seasonEpisodes);
          return;
        }

        // If backend imported episodes successfully, update totalSeasons
        if (seasonEpisodes.length > 0 && totalSeasons === 0) {
          setTotalSeasons(currentEpisodeSeason);
          console.log(`Updated totalSeasons to ${currentEpisodeSeason} based on episode data`);
        }

        // Format episodes for dropdown
        const totalTmsData = [];
        const episodesData = seasonEpisodes.map((ep) => {
          totalTmsData.push(ep.tmsId);
          return {
            value: ep.tmsId,
            label: `${ep.episodeNum} - ${ep.episodeTitle}`,
          };
        });
        
        setEpisodesList([
          { value: { tag: 'total', content: totalTmsData }, label: "Select All" },
          ...episodesData,
        ]);
        
        setSeason(currentEpisodeSeason);
        setEpisode(tmsId);
        setNoSelectedSeason(true);
        
        console.log(`Auto-selected: Season ${currentEpisodeSeason}, Episode ${tmsId}, ${episodesData.length} episodes available`);
      } catch (error) {
        console.error('Error auto-selecting season:', error);
      }
    };

    autoSelectSeason();
  }, [currentEpisodeSeason, parentTmsId, effectiveSeriesId, tmsId, totalSeasons, axios]);

// In menuSelect.js, update the episode mapping to handle missing data gracefully
const handleSeasonChange = async (e) => {
  const seasonValue = e.target.value;
  setSeason(seasonValue);
  setEpisode(null);
  
  const episodesFetchId = parentTmsId || effectiveSeriesId;
  
  if (!episodesFetchId) {
    console.error('No ID available to fetch episodes. ParentTmsId:', parentTmsId, 'EffectiveSeriesId:', effectiveSeriesId);
    return;
  }
  
  console.log(`Fetching episodes for season ${seasonValue} using ID: ${episodesFetchId}`);
  
  try {
    const { data: seasonEpisodes } = await axios.get(
      `/shows/${episodesFetchId}/episodes?season=${seasonValue}`
    );

    console.log('Season episodes response:', seasonEpisodes);

    if (!Array.isArray(seasonEpisodes)) {
      console.error('Expected array of episodes, got:', typeof seasonEpisodes);
      return;
    }

    if (seasonEpisodes.length === 0) {
      console.warn(`No episodes found for season ${seasonValue}.`);
      setEpisodesList([]);
      setNoSelectedSeason(false);
      return;
    }

    // Format episodes - show "Episode X" if no title, "X - Title" if has title
    const totalTmsData = [];
    const episodesData = seasonEpisodes.map((ep) => {
      totalTmsData.push(ep.tmsId);
      
      // Build label based on what data is available
      let episodeLabel;
      if (ep.episodeTitle && ep.episodeTitle.trim()) {
        // Has title: "5 - Breaking Brandon"
        episodeLabel = `${ep.episodeNum} - ${ep.episodeTitle}`;
      } else {
        // No title: "Episode 5" (for soap operas, daily shows)
        episodeLabel = `Episode ${ep.episodeNum}`;
      }
      
      return {
        value: ep.tmsId,
        label: episodeLabel,
      };
    });
    
    setEpisodesList([
      { value: { tag: 'total', content: totalTmsData }, label: "Select All" },
      ...episodesData,
    ]);
    
    setNoSelectedSeason(true);
    console.log(`Loaded ${episodesData.length} episodes for season ${seasonValue}`);
  } catch (error) {
    console.error('Error fetching episodes for season:', error);
  }
};

  const handleEpisodeChange = (e) => {
    const selectedValue = e.target.value;
    setEpisode(selectedValue);
    onEpisodeSelect(selectedValue);
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
      </Stack>
    </>
  );
};