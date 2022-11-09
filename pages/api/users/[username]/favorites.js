// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    pagination: {
      current_page: 1,
      total_pages: 3,
      prev_page: null,
      next_page: 2,
      total_count: 69,
      current_per_page: 25,
    },
    results: [
      {
        id: 6059,
        tmsId: "SH003781390000",
        title: "Big Brother",
        seasonNum: 1,
        episodeNum: 1,
        shares_count: 0,
        likes_count: 1,
        comments_count: 2,
        stories_count: 0,
        activity_count: 3,
        popularity_score: 0,
        shortDescription:
          "Strangers, cut off from the outside world, coexist in an isolated house.",
        seriesId: "188043",
        rootId: 188043,
        preferred_image_uri:
          "http://wewe.tmsimg.com/assets/p18592610_b_v5_aa.jpg",
        episodeTitle: null,
      },
      {
        id: 6060,
        tmsId: "SH003781390000",
        title: "Big Brother",
        seasonNum: 1,
        episodeNum: 1,
        shares_count: 0,
        likes_count: 1,
        comments_count: 2,
        stories_count: 0,
        activity_count: 3,
        popularity_score: 0,
        shortDescription:
          "Strangers, cut off from the outside world, coexist in an isolated house.",
        seriesId: "188043",
        rootId: 188043,
        preferred_image_uri:
          "http://wewe.tmsimg.com/assets/p18592610_b_v5_aa.jpg",
        episodeTitle: null,
      },
    ],
  })
}