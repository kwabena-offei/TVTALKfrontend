import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReactionCard from '../ReactionCard';
import useMediaQuery from "@mui/material/useMediaQuery";

function MainContent({ comments }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {comments.map((comment) => {
        console.log(comment)
        return (
          <Box key={comment.id} mb={isMobile ? 2.75 : 5}>
            <ReactionCard {...comment} profile={comment.user} commentType='Comment' commentsMode />
          </Box>
        );
      })}
    </>
  )
}
export default MainContent;