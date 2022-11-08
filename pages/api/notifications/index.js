// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    "pagination": {
      "current_page": 1,
      "total_pages": 1,
      "prev_page": "",
      "next_page": "",
      "total_count": 2,
      "current_per_page": 50
    },
    "results": [{
      "id": 893151879,
      "message": "ThaRock liked your comment",
      "notifiable_type": "Comment",
      "notifiable_id": 298486374,
      "created_at": "2021-02-21T17:13:04.792Z",
      "read_at": "",
      "actor": {
        "username": "ThaRock",
        "image": "http://example.com/img.jpg",
        "bio": "A bio"
      }
    },
    {
      "id": 893151880,
      "message": "ThaRock liked your comment",
      "notifiable_type": "Comment",
      "notifiable_id": 298486375,
      "created_at": "2021-02-21T17:13:04.792Z",
      "read_at": "",
      "actor": {
        "username": "ThaRock",
        "image": "http://example.com/img.jpg",
        "bio": "A bio"
      }
    }]
  })
}