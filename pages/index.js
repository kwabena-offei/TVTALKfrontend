import DisplayAllShows from '../components/DisplayAllShows'
export default function Home({ categories }) {
  return (
    <>
      <DisplayAllShows categories={categories} />
    </>
  )
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.tvtalk.app/categories')

  const json = await res.json()
  return { categories: json }
}