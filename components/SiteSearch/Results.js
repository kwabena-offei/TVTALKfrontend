import React, { useState, useEffect, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Results({ results, visible, closeResults }) {
  const listRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const showCategory = results.find((result) => result.label === "Programs");
  const shows = showCategory?.options?.map((show) => {
    if (show.image && !show.image.startsWith("https://")) {
      show.image = `https://${show.image}`;
    }
    return show;
  });

  const handleClickOutside = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setListVisible(false);
    }
  };

  const commentCategory = results.find((result) => result.label === "Comments");
  const comments = commentCategory?.options?.filter(
    (comment) => comment.show_tms_id
  );

  if (!visible || (!shows?.length && !comments?.length)) {
    return null;
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: 99,
          top: isMobile ? 50 : 100,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        onClick={closeResults}
      ></div>
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          width: isMobile ? "calc(90vw)" : "100%",
        }}
      >
        {true && (
          <List
            ref={listRef}
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              marginTop: "10px",
              borderRadius: "10px",
              maxHeight: "calc(75vh)",
              overflowY: "scroll",
              minWidth: isMobile ? "calc(90vw)" : "100%",
            }}
          >
            {shows?.map((show) => (
              <>
                <Link
                  href={`/programs/${show.value}/about`}
                  key={show.value}
                  passHref
                >
                  <div
                    key={show.value}
                    style={{
                      display: "flex",
                      gap: "20px",
                    }}
                    sx={{
                      gap: "20px",
                      alignItems: "initial",
                      "&:hover": {
                        bgcolor: "#090F27",
                      },
                    }}
                  >
                    <div
                      style={{
                        maxWidth: isMobile ? 150 : 300,
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={show.image}
                        alt={show.label}
                        width={isMobile ? 150 : 300}
                        height={isMobile ? 100 : 200}
                        objectFit="cover"
                      />
                    </div>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{
                              display: "block",
                              fontSize: 18,
                              fontWeight: 600,
                            }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {show.label}
                          </Typography>
                          <Typography
                            sx={{ display: "block", fontSize: 14 }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {[show.year, show.genre, show.type].join(" / ")}
                          </Typography>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {show.cast}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </div>
                </Link>
                <Divider variant="inset" component="li" />
              </>
            ))}

            {comments?.map((comment) => (
              <>
                <Link
                  href={`/chat/${comment.show_tms_id}#${comment.value}`}
                  key={comment.value}
                  passHref
                >
                  <ListItem
                    component="a"
                    alignItems="flex-start"
                    key={comment.value}
                    sx={{
                      gap: "20px",
                      alignItems: "initial",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#090F27",
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={`${comment.username} profile image`}
                        src={comment.image}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.username}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {comment.label.length > 150
                              ? comment.label.substring(0, 150) +
                                " ... Read More"
                              : comment.label}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Link>
                <Divider variant="inset" component="li" />
              </>
            ))}
            <Divider variant="inset" component="li" />
          </List>
        )}
      </div>
    </>
  );
}
