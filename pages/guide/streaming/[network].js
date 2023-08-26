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

  const res = await fetch(`https://api.tvtalk.app/shows/originals/${network}`)
  const json = await res.json()

  return { network, shows: groupShowsByGenres(json) }
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

// const showsGroupedByGenres = (shows) => {
//   // const { filteredNetwork, guide } = this.props;
//   let genreShows = {};
//   let placedShows = new Set; // used to prevent duplicate shows

//   (shows || []).forEach((station) => {
//     station.airings.forEach((airing) => {
//       let program = airing.program;
//       let data = program;
//       program.channel = airing.channel;
//       program.startTime = airing.startTime;
//       let genre = (program.genres || [])[0];

//       const isFilteredByNetwork = filteredNetwork !== '';
//       const notMatchedByStation = airing.stationId !== filteredNetwork;
//       const notMatchedByStreamingNetwork = airing.program.original_streaming_network !== filteredNetwork;

//       if (isFilteredByNetwork && notMatchedByStation && notMatchedByStreamingNetwork) {
//         return; // this airing is not within the filtered network, so skip it.
//       }

//       if (genre && !placedShows.has(program.seriesId || program.tmsId)) {
//         let editorializedGenre = genreMap[genre] || 'Other Stuff';
//         placedShows.add(program.seriesId || program.tmsId);

//         if (genreShows[editorializedGenre]) {
//           genreShows[editorializedGenre].push(data);
//         } else {
//           genreShows[editorializedGenre] = [data];
//         }
//       }

//     })
//   })

//   return Object.entries(genreShows).map((category, shows) => {
//     return [{
//       shows,
//       title: category
//     }]
//   })
// }
