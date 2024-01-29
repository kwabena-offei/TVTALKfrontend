import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import bg from "../public/assets/LoginBackground.jpg";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandableGrid from "../components/ExpandableGrid";
import Container from "@mui/material/Container";

const chat = ({ categories }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
      <Box className="wrapper">
        <Container maxWidth="xl">
          {/* {categories
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
            ))} */}
            <h1 style={{textAlign: 'center'}}>Chat by show page</h1>
        </Container>
      </Box>
    );
};

export default chat;