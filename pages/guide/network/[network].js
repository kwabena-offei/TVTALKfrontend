import DisplayAllShows from '../../../components/DisplayAllShows'
import { genreMap } from "../../../util/genreMap";

export default function StreamingNetwork({ shows, network }) {
  return (
    <>
      <DisplayAllShows shows={shows} network={network} />
    </>
  )
}

StreamingNetwork.getInitialProps = async (ctx) => {
  const { network } = ctx.query;

  const res = await fetch(`https://api.tvtalk.app/shows/genres?networkId=${network}`)
  const json = await res.json()

  const groupedShows = Object.entries(json).map((category, results) => {
    return {
      title: category[0],
      shows: category[1]?.results
    }
  })

  return { network, shows: groupedShows }
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
