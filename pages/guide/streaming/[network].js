import DisplayAllShows from '../../../components/DisplayAllShows'
import streaming from '../../../components/NetworkSelector/streaming.json';

export default function StreamingNetwork({ categories, network }) {
  return (
    <>
      <DisplayAllShows categories={categories} network={network} />
    </>
  )
}

export async function getStaticProps({ params }) {
  const { network } = params;

  const res = await fetch(`https://api.tvtalk.app/shows/genres?station_id=${network}`)
  const json = await res.json()

  const categoryShows = Object.entries(json).map((category, results) => {
    return {
      title: category[0],
      shows: category[1]?.results
    }
  })

  return { props: { network, categories: categoryShows }, revalidate: 60 * 60 }
}

export async function getStaticPaths() {
  const paths = streaming.map((network) => {
    return `/guide/streaming/${network.slug}`
  })
  return {
    paths,
    fallback: 'blocking'
  };
}