import { useState, useEffect } from "react";
import router from "next/router";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Button,
  Grid,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import HeartButton from "../components/HeartButton";
import BlueButton from "../components/BlueButton";
import Link from "next/link";
import { styled } from "@mui/system";
import { Avatar } from "@mui/material";

function PopularChatter({ popularChatters }) {
  const [expanded, setExpanded] = useState(false);

  const collapsedCount = 6;
  const displayedPopularChatter = expanded
    ? popularChatters
    : popularChatters.slice(0, collapsedCount);

  const Container = styled("div")(({ expanded }) => ({
    gap: "30px",
    overflowX: expanded ? "hidden" : "auto",
    overflowY: "hidden",
    flexWrap: expanded ? "wrap" : "nowrap",
    display: "flex",
    WebkitOverflowScrolling: "touch",
    marginTop: "24px",
    flexGrow: 1,
    scrollSnapType: "both mandatory",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    msOverflowStyle: "none",
    "& > div": {
      scrollSnapAlign: "start",
    },
    "@media (min-width: 935px)": {
      display: "grid",
      marginTop: "0px",
      gridTemplateColumns: "repeat(6, 1fr)",
      overflowX: "initial",
      maxHeight: expanded ? "auto" : "auto",
      overflow: "hidden",
    },
  }));

  const Item = styled("div")(({ expanded }) => ({
    flex: "0 0 calc(80% - 30px)",
    ...(expanded && {
      flex: "0 0 100%",
    }),
    "@media (min-width: 935px)": {
      flex: "initial",
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

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "80px",
        }}
      >
        <StyledTypography>Popular Chatters</StyledTypography>

        {expanded ? (
          <Button
            endIcon={<ExpandLessIcon />}
            style={{ color: "#FFF", width: "200px" }}
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
        {displayedPopularChatter.map(({ user }) => (
          <Item key={user.id} expanded={expanded}>
            <Card
              style={{
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#131B3F",
                paddingTop: "20px",
                width: "100%",
              }}
              key={`${user.id}`}
              sx={{ background: "transparent" }}
            >
              <Avatar sx={{ width: 120, height: 120 }}></Avatar>
              <CardContent sx={{ background: "#131B3F", padding: "0" }}>
                <Typography variant="h5" component="div">
                  <h1
                    style={{ color: "#EFF2FD", fontSize: 18, fontWeight: 500 }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                        padding: "0",
                        margin: "0 0 -5px 0",
                      }}
                    >
                      {user.username}
                    </p>
                    <p
                      style={{
                        fontSize: "10px",
                        textAlign: "center",
                        padding: "0",
                      }}
                    >
                      {user.comments_count} &nbsp;Reactions
                    </p>
                  </h1>
                </Typography>
                <Grid container spacing={1}>
                  <Grid item>
                    <BlueButton
                      title="View"
                      onClick={() =>
                        router.push(`/users/${user.username}/reactions`)
                      }
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Item>
        ))}
      </Container>
    </div>
  );
}

export default PopularChatter;
