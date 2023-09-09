import DisplayAllShows from '../components/DisplayAllShows'
export default function Home({ categories }) {
  return (
    <>
      <DisplayAllShows categories={categories} />
    </>
  )
}

Home.getInitialProps = async ({ res }) => {
  // Set cache for 12 hours
  res.setHeader('Cache-Control', 'public, s-maxage=43200, stale-while-revalidate=86400');
  const categoryResponse = await fetch('https://api.tvtalk.app/categories')
  const json = await categoryResponse.json()

  return { categories: json }
}