import DisplayAllShows from '../../../components/DisplayAllShows'
import networks from '../../../components/NetworkSelector/networks.json';
import { buildAPIUrl } from '../../../services/api';

export default function StreamingNetwork({ categories, network }) {
  return (
    <>
      <DisplayAllShows categories={categories} network={network} />
    </>
  )
}

export async function getStaticProps({ params }) {
  const { network } = params;
  const timezone = 'EST';
  const genreShowsReq = await fetch(buildAPIUrl(`/shows/genres?station_id=${network}`))
  const genreShows = await genreShowsReq.json()

  const categoryShows = Object.entries(genreShows).map((category, results) => {
    const shows = category[1].results
    return {
      title: category[0],
      shows: shows?.filter((show, index) => {
        if (index === 0) return true
        if (!show || !shows[index - 1]) return false
        const sameTitle = show.title === shows[index - 1].title
        const sameSeriesId = show.seriesId === shows[index - 1].seriesId
        return !sameSeriesId && !sameTitle;
      })
    }
  })


  const liveShows = await fetchShows('live', network, timezone);
  // Fetch upcoming shows
  let upcomingShows = await fetchShows('upcoming', network, timezone);
  upcomingShows = upcomingShows?.filter((show, index) => {
    if (index === 0) {
      if (liveShows && liveShows[0] && show && liveShows[0].seriesId === show.seriesId) { return false }
      return true
    }

    if (!show || !upcomingShows[index - 1]) return false
    return show.seriesId != upcomingShows[index - 1].seriesId
  })

  // Add remaining 'liveShows' (which are now upcoming shows) to the 'Upcoming' category
  if (upcomingShows.length) {
    categoryShows.unshift({
      title: 'Upcoming',
      shows: upcomingShows
    });
  }

  // If there was a live show, add it after adding upcoming shows so it remains at the start of the array
  if (liveShows) {
    categoryShows.unshift({
      title: 'Live Now',
      shows: liveShows
    });
  }

  return { props: { network, categories: categoryShows }, revalidate: 60 * 5 }
}


export async function getStaticPaths() {
  const paths = networks.map((network) => {
    return `/guide/network/${network.stationId}`
  })

  return {
    paths,
    fallback: 'blocking'
  };
}

function transformAiringsData(station) {
  if (!station?.airings?.length) {
    return []
  }

  return station?.airings.map((airing) => {
    const program = { ...airing.program };
    program.channel = airing.channel || station.channel || '';
    program.network = station.affiliateCallSign || station.channel || '';
    program.airtime = airing.stateTime || ''; // TODO: format time
    program.preferred_image_uri = program.preferredImage.uri;
    program.preferred_image_uri = program.preferred_image_uri.replace('w=360', 'w=720').replace('h=270', 'h=340');
    return program;
  });
}

async function fetchShows(endpoint, network, timezone) {
  const response = await fetch(buildAPIUrl(`/guide/${endpoint}?network_id=${network}&timezone=${timezone}`));
  const stationData = await response.json();
  return transformAiringsData(stationData[0]);
}
