import Head from 'next/head'
import Image from 'next/image'
import DisplayAllShows from '../components/DisplayAllShows'

export default function Home({shows}) {
  return (
    <>
      <DisplayAllShows shows={shows} />
    </>
  )
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.tvtalk.app/categories')

  const json = await res.json()
  return { shows: json }
}