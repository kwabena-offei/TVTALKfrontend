import DisplayAllShows from "../components/DisplayAllShows";
import useAxios from "../services/api";
export default function Home({ categories, popularChatters, popularComments }) {
  return (
    <>
      <DisplayAllShows
        categories={categories}
        popularChatters={popularChatters}
        popularComments={popularComments}
      />
    </>
  );
}

export async function getStaticProps() {
  const { axios } = useAxios();
  const categoryResponse = await fetch("https://api.tvtalk.app/categories");
  const json = await categoryResponse.json();

  const { data: popularChatters } = await axios.get(`users/top`);
  const { data: popularComments } = await axios.get(`comments/top`);

  return {
    props: {
      categories: json,
      popularChatters: popularChatters.results,
      popularComments: popularComments.results,
    },
    revalidate: 60 * 5,
  };
}
