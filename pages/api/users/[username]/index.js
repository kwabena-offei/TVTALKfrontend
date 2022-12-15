// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    "username": "funkparliament",
    "image": "https://lh3.googleusercontent.com/a/AATXAJx2ImOGTN8HnmebWEwEpEEANtn9Ul0Rb11WVAwj=s96-c",
    "reactions_count": 8,
    "favorites_count": 2,
    "followers_count": null,
    "following_count": null
  })
}