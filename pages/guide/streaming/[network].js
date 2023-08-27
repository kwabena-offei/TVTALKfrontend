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

  const res = await fetch(`https://api.tvtalk.app/shows/genres?station_id=${network}`)
  const json = await res.json()

  const categoryShows = Object.entries(json).map((category, results) => {
    return {
      title: category[0],
      shows: category[1]?.results
    }
  })

  return { network, categories: categoryShows }
}
