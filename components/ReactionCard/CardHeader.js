import React from "react";
import { CardHeader, Avatar } from "@mui/material";
import MoreVertIcon from "../Icons/MoreVertIcon";
import IconButton from "@mui/material/IconButton";

const ReactionsCardHeader = ({ userData, ...props }) => {
  const { id, username, image, timeAgo } = userData;
  return (
    <CardHeader
      {...props}
      classes={{ action: "align-self-center" }}
      sx={{ paddingX: 3.75, paddingY: 2.5, alignItems: "center" }}
      avatar={
        <Avatar
          sx={{ width: 60, height: 60, border: "1.5px solid #090F27" }}
          aria-label={`avatar-${username}-${id}`}
          src={image}
          alt={`${username}_avatar`}
        >
          {username}
        </Avatar>
      }
      action={
        <IconButton
          onClick={() => {
            console.log("click action settings - id:", id);
          }}
          aria-label="settings"
        >
          <MoreVertIcon />
        </IconButton>
      }
      title={username}
      subheader={timeAgo}
      titleTypographyProps={{ fontWeight: 600, fontSize: 20 }}
      subheaderTypographyProps={{ fontWeight: 400, fontSize: 14, color: '#636D92' }}
    />
  );
};

export default ReactionsCardHeader;