import DisplayAllShows from '../../../components/DisplayAllShows'

export default function StreamingNetwork({ categories, network }) {
  return (
    <>
      <DisplayAllShows categories={categories} network={network} />
    </>
  )
}

StreamingNetwork.getInitialProps = async (ctx) => {
  const { network } = ctx.query;
  const timezone = 'EST';
  const genreShowsReq = await fetch(`https://api.tvtalk.app/shows/genres?station_id=${network}`)
  const genreShows = await genreShowsReq.json()

  const categoryShows = Object.entries(genreShows).map((category, results) => {
    return {
      title: category[0],
      shows: category[1]?.results
    }
  })


  // if (liveShows.length) {
  //   categoryShows.unshift({
  //     title: 'Upcoming',
  //     shows: upcomingShows
  //   })
  // }

  // if (upcomingShows.length) {
  //   categoryShows.unshift({
  //     title: 'Upcoming',
  //     shows: upcomingShows
  //   })
  // }

  const liveShows = await fetchShows('live', network, timezone);

  // Fetch upcoming shows
  let upcomingShows = await fetchShows('upcoming', network, timezone);
  console.log(upcomingShows)
  upcomingShows = upcomingShows.filter((show, index) => {
    if (index === 0) { return true }
    return show.tmsId == upcomingShows[index - 1].tmsId
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


  return { network, categories: categoryShows }
}

function transformAiringsData(station) {
  return station.airings.map((airing) => {
    const program = { ...airing.program };
    program.channel = airing.channel;
    program.network = station.affiliateCallSign;
    program.airtime = airing.stateTime; // TODO: format time
    program.preferred_image_uri = program.preferredImage.uri;
    program.preferred_image_uri = program.preferred_image_uri.replace('w=360', 'w=720').replace('h=270', 'h=340');
    return program;
  });
}

async function fetchShows(endpoint, network, timezone) {
  const response = await fetch(`https://api.tvtalk.app/guide/${endpoint}?network_id=${network}&timezone=${timezone}`);
  const stationData = await response.json();
  return transformAiringsData(stationData[0]);
}
