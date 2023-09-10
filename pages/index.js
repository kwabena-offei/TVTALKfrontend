import DisplayAllShows from '../components/DisplayAllShows'
export default function Home({ categories }) {
  return (
    <>
      <DisplayAllShows categories={categories} />
    </>
  )
}

export async function getStaticProps() {
  const categoryResponse = await fetch('https://api.tvtalk.app/categories')
  const json = await categoryResponse.json()

  return { props: { categories: json }, revalidate: 60 * 5 }
}

