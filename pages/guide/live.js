import DisplayAllShows from '../../components/DisplayAllShows'
import { genreMap } from "../../util/genreMap";

export default function StreamingNetwork({ categories, network }) {
  return (
    <>
      <DisplayAllShows categories={categories} network={network} />
    </>
  )
}

StreamingNetwork.getInitialProps = async (ctx) => {
  const timezone = 'EST';
  const res = await fetch(`https://api.tvtalk.app/guide/live?timezone=${timezone}`)
  const json = await res.json()
  const stations = json;
  const shows = [];
  stations.forEach((station) => {
    station.airings.forEach((airing) => {
      const program = airing.program;
      program.channel = airing.channel;
      program.network = station.affiliateCallSign;
      program.airtime = airing.stateTime; // TODO: format time
      program.preferred_image_uri = program.preferredImage.uri;
      program.preferred_image_uri = program.preferred_image_uri.replace('w=360', 'w=720').replace('h=270', 'h=340');
      shows.push(airing.program)
    })
  })

  const categoryShows = groupShowsByGenres(shows);
  const liveShows = shows;

  if (liveShows.length) {
    categoryShows.unshift({
      title: 'Live now',
      shows: liveShows
    })
  }

  return { network: 'live', categories: categoryShows }
}

const groupShowsByGenres = (shows) => {
  const placedShows = new Set;
  const genreShows = {};

  shows.forEach((show) => {
    if (placedShows.has(show.seriesId)) { return };

    const subGenre = (show.genres[0]) || 'Other Stuff';
    const genre = genreMap[subGenre];
    if (genreShows[genre]) {
      genreShows[genre].push(show);
    } else {
      genreShows[genre] = [show];
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

