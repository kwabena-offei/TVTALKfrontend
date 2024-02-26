import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReactionCard from "../components/ReactionCard";
import { styled } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography, Button, Item } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useAxios from "../services/api";

const PopularCommets = () => {
  const { axios } = useAxios();
  const [topComments, setTopComments] = useState([]);

  const [expanded, setExpanded] = useState(false);
  const collapsedCount = 8;
  const displayedShows = topComments
    ? topComments
    : topComments.slice(0, collapsedCount);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchPopularComments = async () => {
      const { data: topCommentsData } = await axios.get(`comments/top?limit=8`);
      setTopComments(topCommentsData.results);
    };
    fetchPopularComments();
  }, []);

  const Container = styled("div")(({ expanded }) => ({
    gap: "30px",
    overflowX: expanded ? "hidden" : "auto",
    overflowY: "hidden",
    flexWrap: expanded ? "wrap" : "nowrap",
    display: "flex",
    WebkitOverflowScrolling: "touch",
    flexGrow: 1,
    scrollSnapType: "both mandatory",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    msOverflowStyle: "none",
    "& > div": {
      scrollSnapAlign: "start",
    },
    "@media (min-width: 0)": {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      overflowX: "initial",
      maxHeight: expanded ? "auto" : "auto",
      overflow: "hidden",
      marginTop: "24px",
    },
    "@media (min-width: 935px)": {
      marginTop: "0px",
    },
    "@media (min-width: 1350px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      overflowX: "auto",
      maxHeight: expanded ? "auto" : "250px",
    },
  }));

  const StyledTypography = styled(Typography)({
    color: "#EFF2FD",
    fontFamily: "Gilroy",
    fontSize: "40px",
    fontWeight: 700,
    lineHeight: "130%",
    letterSpacing: "0.4px",
    scrollSnapAlign: "start",
    marginBottom: "25px",
    "@media (max-width: 600px)": {
      fontSize: "20px",
      marginBottom: "15px",
    },
  });

  const Item = styled("div")(({ expanded }) => ({
    flex: "0 0 calc(80% - 30px)",
    ...(expanded && {
      flex: "0 0 100%",
    }),
    "@media (min-width: 900px)": {
      flex: "initial",
    },
  }));

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "80px",
          }}
        >
          <StyledTypography>Popular Comments</StyledTypography>

          {expanded ? (
            <Button
              endIcon={<ExpandLessIcon />}
              style={{ color: "#FFF" }}
              variant="outlined"
              onClick={() => {
                setExpanded(false);
              }}
            >
              Close All
            </Button>
          ) : (
            <Button
              style={{ color: "#FFF" }}
              endIcon={<ExpandMoreIcon />}
              variant="outlined"
              onClick={() => {
                setExpanded(true);
              }}
            >
              View All
            </Button>
          )}
        </div>
        <Container expanded={expanded}>
          {displayedShows.map((comment, index) => {
            return (
              <Item key={comment.id} mb={isMobile ? 2.75 : 5}>
                <ReactionCard
                  {...comment}
                  profile={comment.user}
                  commentType="Comment"
                  commentsMode
                />
              </Item>
            );
          })}
        </Container>
      </div>
    </>
  );
};

export default PopularCommets;

const comments = [
  {
    user: { id: 474, username: "aaliyah", image: null },
    id: 2079,
    type: "comment",
    text: 'Wow, the way Ella navigates her career choices in "Run the World" is both nerve-wracking and inspiring - talk about a brilliant performance! And Renee\'s big career decision, had me on the edge of my seat. This show is a masterclass in character development, hats off to the cast!',
    images: [],
    videos: [],
    created_at: "2023-07-14T20:46:14.788Z",
    created_at_formatted: "7 months",
    likes_count: 0,
    current_user_liked: false,
    sub_comments_count: 1,
    shares_count: 0,
    tmsId: "EP038044880007",
    story_id: null,
    withoutActions: false,
  },
  {
    user: { id: 474, username: "aaliyah", image: null },
    id: 2080,
    type: "comment",
    text: 'Wow, the way Ella navigates her career choices in "Run the World" is both nerve-wracking and inspiring - talk about a brilliant performance! And Renee\'s big career decision, had me on the edge of my seat. This show is a masterclass in character development, hats off to the cast!',
    images: [],
    videos: [],
    created_at: "2023-07-14T20:46:14.788Z",
    created_at_formatted: "7 months",
    likes_count: 0,
    current_user_liked: false,
    sub_comments_count: 1,
    shares_count: 0,
    tmsId: "EP038044880007",
    story_id: null,
    withoutActions: false,
  },
  {
    user: { id: 474, username: "aaliyah", image: null },
    id: 2081,
    type: "comment",
    text: 'Wow, the way Ella navigates her career choices in "Run the World" is both nerve-wracking and inspiring - talk about a brilliant performance! And Renee\'s big career decision, had me on the edge of my seat. This show is a masterclass in character development, hats off to the cast!',
    images: [],
    videos: [],
    created_at: "2023-07-14T20:46:14.788Z",
    created_at_formatted: "7 months",
    likes_count: 0,
    current_user_liked: false,
    sub_comments_count: 1,
    shares_count: 0,
    tmsId: "EP038044880007",
    story_id: null,
    withoutActions: false,
  },
];

// const comment = [
//   {
//     user: { id: 474, username: "aaliyah", image: null },
//     id: 2082,
//     type: "comment",
//     text: 'Wow, the way Ella navigates her career choices in "Run the World" is both nerve-wracking and inspiring - talk about a brilliant performance! And Renee\'s big career decision, had me on the edge of my seat. This show is a masterclass in character development, hats off to the cast!',
//     images: [],
//     videos: [],
//     created_at: "2023-07-14T20:46:14.788Z",
//     created_at_formatted: "7 months",
//     likes_count: 0,
//     current_user_liked: false,
//     sub_comments_count: 1,
//     shares_count: 0,
//     tmsId: "EP038044880007",
//     story_id: null,
//     withoutActions: false,
//   },
//   {
//     user: { id: 474, username: "aaliyah", image: null },
//     id: 2083,
//     type: "comment",
//     text: 'Wow, the way Ella navigates her career choices in "Run the World" is both nerve-wracking and inspiring - talk about a brilliant performance! And Renee\'s big career decision, had me on the edge of my seat. This show is a masterclass in character development, hats off to the cast!',
//     images: [],
//     videos: [],
//     created_at: "2023-07-14T20:46:14.788Z",
//     created_at_formatted: "7 months",
//     likes_count: 0,
//     current_user_liked: false,
//     sub_comments_count: 1,
//     shares_count: 0,
//     tmsId: "EP038044880007",
//     story_id: null,
//     withoutActions: false,
//   },
//   {
//     user: { id: 474, username: "aaliyah", image: null },
//     id: 2084,
//     type: "comment",
//     text: 'Wow, the way Ella navigates her career choices in "Run the World" is both nerve-wracking and inspiring - talk about a brilliant performance! And Renee\'s big career decision, had me on the edge of my seat. This show is a masterclass in character development, hats off to the cast!',
//     images: [],
//     videos: [],
//     created_at: "2023-07-14T20:46:14.788Z",
//     created_at_formatted: "7 months",
//     likes_count: 0,
//     current_user_liked: false,
//     sub_comments_count: 1,
//     shares_count: 0,
//     tmsId: "EP038044880007",
//     story_id: null,
//     withoutActions: false,
//   },
// ];
