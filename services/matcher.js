const axios = require('axios');
const { MongoClient } = require('mongodb');

/**
 * Fetch episodes from GraceNote for a series and persist them with the
 * matching internal show id.
 * @param {string} showId - Internal show identifier.
 * @param {string} gracenoteSeriesId - GraceNote series identifier.
 */
async function matchEpisodes(showId, gracenoteSeriesId) {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const episodesCollection = db.collection('episodes');

    const { data } = await axios.get(`https://data.gracenote.com/tv/series/${gracenoteSeriesId}/episodes`, {
      params: { api_key: process.env.GRACENOTE_API_KEY }
    });

    const episodes = data.episodes || [];
    if (!episodes.length) {
      console.log(`No episodes found for series ${gracenoteSeriesId}`);
      return;
    }

    const docs = episodes.map((ep) => ({
      showId,
      episodeId: ep.id,
      title: ep.title,
      airDate: ep.originalAirDate,
      metadata: ep
    }));

    const result = await episodesCollection.insertMany(docs, { ordered: false });
    console.log(`Inserted ${result.insertedCount} episodes for show ${showId}`);
  } catch (err) {
    console.error('Episode matcher error:', err);
    throw err;
  } finally {
    await client.close();
  }
}

module.exports = { matchEpisodes };
