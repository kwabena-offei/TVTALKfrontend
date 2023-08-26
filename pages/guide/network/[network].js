import DisplayAllShows from '../../../components/DisplayAllShows'

export default function StreamingNetwork({ shows, network }) {
  return (
    <>
      <DisplayAllShows shows={shows} network={network} />
    </>
  )
}

StreamingNetwork.getInitialProps = async (ctx) => {
  const { network } = ctx.query;

  const res = await fetch(`https://api.tvtalk.app/shows/genres?station_id=${network}`)
  const json = await res.json()

  const groupedShows = Object.entries(json).map((category, results) => {
    return {
      title: category[0],
      shows: category[1]?.results
    }
  })

  return { network, shows: groupedShows }
}
