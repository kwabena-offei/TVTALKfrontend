// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // get Id from the url
  const { id: actorId } = req.query;

  const actor = await fetch(
    `https://data.tmsapi.com/v1.1//celebs/${actorId}?api_key=${process.env.TMS_API_KEY}`
  );

  const actorData = await actor.json();

  console.log("actorData", actorData);

  res.status(200).json(actorData);
}
