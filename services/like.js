import useAxios from "./api";

export const setLike = async ({ type, id, isLiked }) => {
  const { axios } = useAxios()
  const response = await axios.post('/likes', 
    {
      [type]: id,
      liked: isLiked
    }
  )
  console.log('[like response]', response)
  return response
}