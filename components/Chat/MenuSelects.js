import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, CircularProgress, Box } from "@mui/material";
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
  const [episode, setEpisode] = useState(tmsId.startsWith('EP') ? tmsId : "");
  const [episodesList, setEpisodesList] = useState([]);
  const [sort, setSort] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [noSelectedSeason, setNoSelectedSeason] = useState(false);
  const pollingRef = useRef(null);
  
  const [totalSeasons, setTotalSeasons] = useState(parsed(seasons) || 0);
  const [totalEpisodes, setTotalEpisodes] = useState(parsed(episodes) || 0);
  const [effectiveSeriesId, setEffectiveSeriesId] = useState(seriesId);
  const [parentTmsId, setParentTmsId] = useState(null);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);
  const [currentEpisodeSeason, setCurrentEpisodeSeason] = useState(null);
  
  const hasLoadedMetadata = useRef(false);
  const hasAutoSelected = useRef(false);

  // Add a cleanup effect to stop polling if the component is unmounted
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  const seasonsList = new Array(totalSeasons)
    .fill("0")
    .map((_, index) => ({ label: `Season ${index + 1}`, value: index + 1 }));
  
  const sortByList = [
    { label: "Recent", value: "recent" },
    { label: "Popularity", value: "popularity" },
  ];

  useEffect(() => {
    const fetchMetadata = async () => {
      if (hasLoadedMetadata.current || !tmsId) {
        return;
      }

      const isEpisode = tmsId?.startsWith('EP');
      const isShow = tmsId?.startsWith('SH');
      const hasSeasons = parsed(seasons) > 0;
      
      const needsMetadata = isEpisode || (isShow && !hasSeasons);
      if (!needsMetadata) {
        hasLoadedMetadata.current = true;
        return;
      }

      console.log(`Fetching metadata for ${tmsId}...`);
      setIsLoadingMetadata(true);
      hasLoadedMetadata.current = true;

      try {
        const { data: showData } = await axios.get(`/shows/${tmsId}`);
        
        if (showData.effectiveSeriesId || showData.seriesId) {
          setEffectiveSeriesId(showData.effectiveSeriesId || showData.seriesId);
        }
        
        if (showData.parentTmsId) {
          setParentTmsId(showData.parentTmsId);
        }
        
        const seasonsCount = showData.totalSeasons || 0;
        const episodesCount = showData.totalEpisodes || 0;
        
        setTotalSeasons(seasonsCount);
        setTotalEpisodes(episodesCount);
        
        if (isEpisode && showData.seasonNum) {
          setCurrentEpisodeSeason(showData.seasonNum);
        }
      } catch (error) {
        console.error('Error fetching metadata:', error);
      } finally {
        setIsLoadingMetadata(false);
      }
    };

    fetchMetadata();
  }, [tmsId, seasons, seriesId, axios]);

  const processEpisodesResponse = (data, seasonValue) => {
    const seasonEpisodes = (data && data.episodes) || [];
    const isImporting = (data && data.importing) || false;

    // Format episodes for the dropdown
    const totalTmsData = [];
    const episodesData = seasonEpisodes.map((ep) => {
      totalTmsData.push(ep.tmsId);
      let episodeLabel = ep.episodeTitle ? `${ep.episodeNum} - ${ep.episodeTitle}` : `Episode ${ep.episodeNum}`;
      return { value: ep.tmsId, label: episodeLabel };
    });

    setEpisodesList([
      { value: { tag: 'total', content: totalTmsData }, label: "Select All" },
      ...episodesData,
    ]);

    if (seasonEpisodes.length > 0) {
      setNoSelectedSeason(true);
    }

    // Handle polling logic
    if (isImporting) {
      setIsLoadingEpisodes(true);
    } else {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      setIsLoadingEpisodes(false);
      console.log(`Finished loading ${episodesData.length} episodes for season ${seasonValue}`);
    }
    
    return isImporting;
  };

  const fetchEpisodes = async (episodesFetchId, seasonValue) => {
    try {
      const { data } = await axios.get(
        `/shows/${episodesFetchId}/episodes?season=${seasonValue}`
      );
      return processEpisodesResponse(data, seasonValue);
    } catch (error) {
      console.error('Error fetching episodes:', error);
      if (pollingRef.current) clearInterval(pollingRef.current);
      setIsLoadingEpisodes(false);
      return false; // Stop polling on error
    }
  };

  useEffect(() => {
    const autoSelectSeason = async () => {
      const episodesFetchId = parentTmsId || effectiveSeriesId;
      if (hasAutoSelected.current || !currentEpisodeSeason || !episodesFetchId) {
        return;
      }
      hasAutoSelected.current = true;
      console.log(`Auto-selecting season ${currentEpisodeSeason} for episode ${tmsId}`);

      setSeason(currentEpisodeSeason);
      setEpisode(tmsId);
      setIsLoadingEpisodes(true);
      if (pollingRef.current) clearInterval(pollingRef.current);

      const isStillImporting = await fetchEpisodes(episodesFetchId, currentEpisodeSeason);

      if (isStillImporting) {
        pollingRef.current = setInterval(() => {
          fetchEpisodes(episodesFetchId, currentEpisodeSeason);
        }, 3000); // Poll every 3 seconds
      }
    };

    autoSelectSeason();
  }, [currentEpisodeSeason, parentTmsId, effectiveSeriesId, tmsId, axios]);

  const handleSeasonChange = async (e) => {
    const seasonValue = e.target.value;
    setSeason(seasonValue);
    setEpisode(null);
    setIsLoadingEpisodes(true);
    if (pollingRef.current) clearInterval(pollingRef.current);
    
    const episodesFetchId = parentTmsId || effectiveSeriesId;
    if (!episodesFetchId) {
      console.error('No ID available to fetch episodes.');
      setIsLoadingEpisodes(false);
      return;
    }
    
    console.log(`Fetching episodes for season ${seasonValue}`);
    const isStillImporting = await fetchEpisodes(episodesFetchId, seasonValue);

    if (isStillImporting) {
      pollingRef.current = setInterval(() => {
        fetchEpisodes(episodesFetchId, seasonValue);
      }, 3000);
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
          disabled={isLoadingMetadata || totalSeasons === 0 || isLoadingEpisodes}
        />
        {(isLoadingEpisodes || noSelectedSeason) && (
            <Box>
                {isLoadingEpisodes && (
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1.5}
                        sx={{
                        color: '#A5B0D6',
                        fontSize: '0.95rem',
                        padding: '12px 16px',
                        backgroundColor: 'rgba(16, 24, 56, 0.6)',
                        borderRadius: '8px',
                        border: '1px solid rgba(165, 176, 214, 0.2)',
                        marginBottom: '10px'
                        }}
                    >
                        <CircularProgress size={20} sx={{ color: '#A5B0D6' }} />
                        <span>Loading episodes...</span>
                    </Box>
                )}
                {noSelectedSeason && (
                    <OutlinedSelect
                        selectList={episodesList}
                        label="Select Episode"
                        id="selectEpisode"
                        handleChange={handleEpisodeChange}
                        value={episode}
                        disabled={isLoadingEpisodes}
                    />
                )}
            </Box>
        )}
      </Stack>
    </>
  );
};