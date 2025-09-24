import DisplayAllShows from '../../components/DisplayAllShows'
import { genreMap } from "../../util/genreMap";
import useAxios, { buildAPIUrl } from '../../services/api';

// Format ISO date string to a more readable format
const formatAirTime = (isoString) => {
  if (!isoString) return 'N/A';

  try {
    const date = new Date(isoString);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isToday) {
      return `Today, ${timeStr}`;
    } else if (isTomorrow) {
      return `Tomorrow, ${timeStr}`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + `, ${timeStr}`;
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return isoString;
  }
};

// Transform stations data to shows format (consistent with homepage)
const transformStationsToShows = (stations) => {
  if (!Array.isArray(stations)) {
    console.error('Expected stations to be an array, got:', typeof stations);
    return [];
  }

  try {
    const shows = stations.flatMap(station => {
      if (!station || !Array.isArray(station.airings)) {
        return [];
      }

      return station.airings.map(airing => {
        if (!airing || !airing.program) {
          return null;
        }

        const program = airing.program;
        const network = station.affiliateCallSign || station.callSign || '—';
        const channel = airing.channel || station.channel || station.callSign || '—';

        return {
          tmsId: program.tmsId || `unknown-${Math.random().toString(36).substring(2, 9)}`,
          title: program.title || 'Unknown Title',
          preferred_image_uri: program.preferredImage?.uri?.replace('w=360', 'w=720').replace('h=270', 'h=340') || '/assets/live.jpg',
          networks: [{ name: network }],
          channel: channel,
          airtime: formatAirTime(airing.startTime),
          rawAirtime: airing.startTime || new Date().toISOString(),
          genres: program.genres || [],
          seriesId: program.seriesId || null
        };
      });
    }).filter(Boolean);

    return shows.sort((a, b) => {
      const timeA = new Date(a.rawAirtime).getTime();
      const timeB = new Date(b.rawAirtime).getTime();
      return timeA - timeB;
    });
  } catch (error) {
    console.error('Error transforming station data:', error);
    return [];
  }
};

export default function StreamingNetwork({ categories, network }) {
  return (
    <>
      <DisplayAllShows
      categories={categories}
      network={network}
      showLiveRow={false}
      showUpcomingRow={false} />
    </>
  )
}

export async function getServerSideProps(context) {
  const { axios } = useAxios(context);
  
  try {
    // The backend will automatically use user's cable_provider/zipcode if authenticated
    // or fall back to timezone parameter for non-authenticated users
    const timezone = context.query.timezone || 'EST';
    const res = await axios.get(`/guide/live?timezone=${timezone}`);
    const json = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
    
    // Transform the data using the same function as homepage
    const shows = transformStationsToShows(json);

    const categoryShows = groupShowsByGenres(shows);
    const liveShows = shows;

    if (liveShows.length) {
      categoryShows.unshift({
        title: 'Live now',
        shows: liveShows
      })
    }

    return { props: { network: 'live', categories: categoryShows } };
  } catch (error) {
    console.error('Error fetching live guide data:', error);
    return { props: { network: 'live', categories: [] } };
  }
}

const groupShowsByGenres = (shows) => {
  const placedShows = new Set;
  const genreShows = {};

  shows.forEach((show) => {
    if (placedShows.has(show.seriesId)) { return };

    const subgenres = Array.isArray(show.genres) ? show.genres : [];
    // Find the first subgenre that maps to an editorialized genre; fallback to 'Other Stuff'
    const firstMappedSubgenre = subgenres.find((sub) => genreMap[sub]);
    const genreTitle = firstMappedSubgenre ? genreMap[firstMappedSubgenre] : 'Other Stuff';

    if (genreShows[genreTitle]) {
      genreShows[genreTitle].push(show);
    } else {
      genreShows[genreTitle] = [show];
    }

    placedShows.add(show.seriesId);
  })

  return Object.entries(genreShows).map((category, shows) => {
    return {
      title: category[0],
      shows: category[1],
    }
  })
}

