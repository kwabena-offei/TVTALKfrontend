// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
export default async function handler(req, res) {
  // get Id from the url
  const { id: actorId } = req.query;

  const TMS_API_KEY = process.env.TMS_API_KEY;

  const { data } = await axios.get(
    `https://data.tmsapi.com/v1.1/celebs/${actorId}?api_key=${TMS_API_KEY}`
  );

  res.status(200).json(data);
}
