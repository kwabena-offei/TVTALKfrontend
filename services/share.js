// POST /shares
// надо отправить данные вот так:
// Comments:
// {comment_id: [id_of_comment]}
// News:
// {story_id: [id_of_news_article]}

// Sub_comments: -- не предусмотрено на бекенде

import useAxios from "./api";

export const setShare = async ({ id, type }) => {
  const { axios } = useAxios();
  const response = await axios.post("/shares", {
    [type]: id,
  });
  // console.log("[share response]", response);
  return response;
};
