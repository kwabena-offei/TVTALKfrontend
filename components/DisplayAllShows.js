import React, { useState, useEffect } from "react";
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Carousel from "react-elastic-carousel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/router";
import HeartButton from "./HeartButton";
import BlueButton from "./BlueButton";
import NetworkSelector from "./NetworkSelector";
import Image from "next/image";
import { styled } from "@mui/system";
import ExpandableGrid from "./ExpandableGrid";
import PopularChatter from "./PopularChatter"
import PopularCommets from './PopularCommets'
import UpcomingCard from './UpcomingCard'
import Live from './Live'
import Container from "@mui/material/Container";
import { Avatar, CardActions } from "@mui/material";

const DisplayAllShows = ({ categories, network }) => {
  const router = useRouter();

  // Pushes tmsID to the about page
  const handleAbout = (tmsId, title) => {
    router.push({ pathname: "/programs/[tmsId]/about", query: { tmsId } });
  };
  const handleChat = (tmsId, title) => {
    router.push({ pathname: "/chat/[tmsId]", query: { tmsId } });
  };

  const Title = styled("h1")({
    color: "var(--text-color, #EFF2FD)",
    textAlign: "center",
    fontFeatureSettings: "'calt' off",
    fontFamily: "Gilroy",
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: 700,
    margin: 0,
    lineHeight: "120%", // 36px
    "@media (max-width: 600px)": {
      width: "335px",
      margin: "0 auto",
    },
    "@media (min-width: 600px)": {
      fontSize: "64px",
      lineHeight: "120%", // This equals 76.8px
    },
  });
  const Subtitle = styled("h2")({
    color: "var(--text-color, #EFF2FD)",
    textAlign: "center",
    fontFeatureSettings: "'calt' off",
    fontFamily: "Gilroy",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "120%", // 19.2px
    "@media (min-width: 600px)": {
      fontSize: "32px",
      lineHeight: "120%", // This equals 38.4px
    },
  });

  const StyledBox = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "600px",
    background:
      "linear-gradient(rgba(9, 15, 39, 0.32), rgba(9, 15, 39, 0.32)), url('/assets/header.jpg')",
    backgroundSize: "cover, cover",
    backgroundPosition: "center, center",
    backgroundRepeat: "no-repeat, no-repeat",
    "@media (max-width: 600px)": {
      height: "calc(45vh)",
    },
  });

  useEffect(() => {
    if (network) {
    }
  }, [network]);

  return (
    <>
      <StyledBox>
        <Title>Let's Start a Community of TV Fans</Title>
        <Subtitle>Press "Chat" and post a message!</Subtitle>
      </StyledBox>

      <Box className="wrapper">
        <Container maxWidth="xl">
          <NetworkSelector activeNetwork={network} />
            <PopularChatter />
            <PopularCommets />
          {categories
            .filter((category) => category.shows.length)
            .map((category, index) => (
              <div
                key={`${network}-${category}-${index}`}
                style={{ margin: "100px 0" }}
              >
                <div>
                  <ExpandableGrid
                    tvShows={category.shows}
                    handleChat={handleChat}
                    title={category.title}
                  />
                </div>
              </div>
            ))}
            <Live />
            <UpcomingCard />
        </Container>
      </Box>
    </>
  );
};

export default DisplayAllShows;

// style={{ marginLeft: 50, paddingLeft: 20, marginBottom: 20 }}
