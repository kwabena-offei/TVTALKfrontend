import DisplayAllShows from '../../../components/DisplayAllShows'
import useAxios, { buildAPIUrl } from '../../../services/api';
import { genreMap } from '../../../util/genreMap';

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
 
const groupShowsByGenres = (shows) => {
  const placedShows = new Set;
  const genreShows = {};

  shows.forEach((show) => {
    if (placedShows.has(show.seriesId)) { return };

    const subgenres = Array.isArray(show.genres) ? show.genres : [];
    const firstMappedSubgenre = subgenres.find((sub) => genreMap[sub]);
    const genreTitle = firstMappedSubgenre ? genreMap[firstMappedSubgenre] : 'Other Stuff';

    if (genreShows[genreTitle]) {
      genreShows[genreTitle].push(show);
    } else {
      genreShows[genreTitle] = [show];
    }

    placedShows.add(show.seriesId);
  })

  return Object.entries(genreShows).map((category) => {
    return {
      title: category[0],
      shows: category[1],
    }
  })
}

export async function getServerSideProps(context) {
  const { network } = context.params;
  try {
    // Streaming: use Originals endpoint and build editorial categories client-side
    const res = await fetch(buildAPIUrl(`/shows/originals/${network}`));
    const json = await res.json();
    const originals = Array.isArray(json?.results) ? json.results : (Array.isArray(json) ? json : []);

    const categories = groupShowsByGenres(originals);

    return { props: { network, categories } }
  } catch (error) {
    console.error('Error building streaming page:', error);
    return { props: { network, categories: [] } }
  }
}