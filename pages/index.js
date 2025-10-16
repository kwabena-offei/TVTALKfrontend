import useAxios, { buildAPIUrl } from '../services/api';

import DisplayAllShows from '../components/DisplayAllShows'

// Transform stations data to shows format (copied from Live.js)
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
          preferred_image_uri: program.preferredImage?.uri || '/assets/live.jpg',
          networks: [{ name: network }],
          channel: channel,
          airtime: formatAirTime(airing.startTime),
          rawAirtime: airing.startTime || new Date().toISOString()
        };
      });
    }).filter(Boolean);

    // Remove duplicates
    const uniqueShows = shows.reduce((acc, show) => {
      const key = `${show.tmsId}-${show.rawAirtime}`;
      if (!acc.some(s => `${s.tmsId}-${s.rawAirtime}` === key)) {
        acc.push(show);
      }
      return acc;
    }, []);

    return uniqueShows.sort((a, b) => {
      const timeA = new Date(a.rawAirtime).getTime();
      const timeB = new Date(b.rawAirtime).getTime();
      return timeA - timeB;
    });
  } catch (error) {
    console.error('Error transforming station data:', error);
    return [];
  }
};

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

export default function Home({ categories, liveShows, upcomingShows }) {
  return (
    <>
      <DisplayAllShows categories={categories} liveShows={liveShows} upcomingShows={upcomingShows} />
    </>
  )
}

export async function getServerSideProps(context) {
  const { axios } = useAxios(context);
  
  try {
    // Fetch categories added from admin panel
    const categoryResponse = await fetch(buildAPIUrl('/categories'))
    const categories = await categoryResponse.json()

    // Fetch live shows data
    let liveResponse = await axios.get('/guide/live')
    let liveData = typeof liveResponse.data === 'string' ? JSON.parse(liveResponse.data) : liveResponse.data
    
    // Fetch upcoming shows data  
    let upcomingResponse = await axios.get('/guide/upcoming')
    let upcomingData = typeof upcomingResponse.data === 'string' ? JSON.parse(upcomingResponse.data) : upcomingResponse.data

    // Fallback: if backend returns empty (timezone mismatch), try EST explicitly
    if ((!Array.isArray(liveData) || liveData.length === 0) || (!Array.isArray(upcomingData) || upcomingData.length === 0)) {
      try {
        const [liveEst, upcomingEst] = await Promise.all([
          axios.get('/guide/live?timezone=EST'),
          axios.get('/guide/upcoming?timezone=EST')
        ])
        const maybeLive = typeof liveEst.data === 'string' ? JSON.parse(liveEst.data) : liveEst.data
        const maybeUpcoming = typeof upcomingEst.data === 'string' ? JSON.parse(upcomingEst.data) : upcomingEst.data
        if (Array.isArray(maybeLive) && maybeLive.length) liveData = maybeLive
        if (Array.isArray(maybeUpcoming) && maybeUpcoming.length) upcomingData = maybeUpcoming
      } catch (e) {
        // noop; keep original
      }
    }
    
    // Transform data to the correct format
    const liveShows = transformStationsToShows(liveData)
    const upcomingShows = transformStationsToShows(upcomingData)

    // uncomment for Debugging SSR output in Dev mode
     if (process.env.NODE_ENV !== 'production') {
      try {
        console.log('[SSR] /guide/live type:', typeof liveData, 'isArray:', Array.isArray(liveData), 'len:', Array.isArray(liveData) ? liveData.length : '—')
        console.log('[SSR] /guide/upcoming type:', typeof upcomingData, 'isArray:', Array.isArray(upcomingData), 'len:', Array.isArray(upcomingData) ? upcomingData.length : '—')
        console.log('[SSR] transformed liveShows len:', liveShows.length, 'upcomingShows len:', upcomingShows.length)
      } catch {}
    }

    return { 
      props: { 
        categories, 
        liveShows,
        upcomingShows 
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { 
      props: { 
        categories: [], 
        liveShows: [],
        upcomingShows: []
      }
    }
  }
}

