import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReactionCard from "../ReactionCard";
import useMediaQuery from "@mui/material/useMediaQuery";

function MainContent({ comments, focusCommentId: commentId }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const sortedComments = comments.slice().sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  console.log("comments", comments);

  const commentListRef = useRef(null);

  useEffect(() => {
    if (commentId && commentListRef?.current) {
      setTimeout(() => {
        const comment = document.getElementById(commentId);
        console.log("comment doc", comment);
        if (comment) {
          comment.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Adjust the timeout value as needed
    }
  }, [commentId, commentListRef, comments]);

  return (
    <div ref={commentListRef}>
      {sortedComments.map((comment) => {
        return (
          <Box key={comment.id} mb={isMobile ? 2.75 : 5} id={comment.id}>
            <ReactionCard
              {...comment}
              profile={comment.user}
              commentType="Comment"
              commentsMode
            />
          </Box>
        );
      })}
    </div>
  );
}
export default MainContent;
