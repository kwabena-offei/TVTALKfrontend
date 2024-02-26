import React from "react";
import { useRouter } from "next/router";
import { Box, Typography, CardMedia } from "@mui/material";

const ActorCard = ({ name, characterName, imageUrl, id }) => {
  const router = useRouter();
  return (
    <Box
      sx={{ width: "230px" }}
      onClick={() => router.push(`/actors/${id}/gallery`)}
      style={{ cursor: "pointer" }}
    >
      <CardMedia
        component="img"
        src={imageUrl}
        alt="Actors photo"
        sx={{ borderRadius: "6px", height: "260px", width: "230px" }}
      />
      <Box sx={{ marginTop: "14px" }}>
        <Typography
          sx={{
            fontSize: "20px",
            lineHeight: "26px",
            color: "#EFF2FD",
            textAlign: "center",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            lineHeight: "21px",
            color: "#919CC0",
            textAlign: "center",
          }}
        >
          {`(${characterName})`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ActorCard;
