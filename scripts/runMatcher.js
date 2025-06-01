require('dotenv').config();
const { matchEpisodes } = require('../services/matcher');

(async () => {
  const showId = process.argv[2];
  const gnSeriesId = process.argv[3];

  if (!showId || !gnSeriesId) {
    console.error('Usage: node runMatcher <showId> <gracenoteSeriesId>');
    process.exit(1);
  }

  try {
    await matchEpisodes(showId, gnSeriesId);
    console.log('Episode matching completed successfully.');
  } catch (err) {
    console.error('Matcher failed:', err);
    process.exit(1);
  }
})();
