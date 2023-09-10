import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Carousel from 'react-elastic-carousel';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from 'next/router'
import HeartButton from '../components/HeartButton';
import BlueButton from '../components/BlueButton';
import NetworkSelector from '../components/NetworkSelector'
import Image from 'next/image'
import styled from 'styled-components';
import ExpandableGrid from '../components/ExpandableGrid';
import Container from '@mui/material/Container';

const DisplayAllShows = ({ categories, network }) => {
  const router = useRouter()
  const [windowWidth, setWindowWidth] = useState(null);

  const convertToSlug = (name) => {
    let slug = ''
    slug = name.replace('%20', '-').toLowerCase()
    return slug
  }

  // Pushes tmsID to the about page
  const handleAbout = (tmsId, title) => {
    router.push({ pathname: '/programs/[tmsId]/about', query: { tmsId } })
  }
  const handleChat = (tmsId, title) => {
    router.push({ pathname: '/chat/[tmsId]', query: { tmsId } })
  }

  const Title = styled.h1`
  color: var(--text-color, #EFF2FD);
  text-align: center;
  font-feature-settings: 'calt' off;
  font-family: 'Gilroy';
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 36px */
  text-transform: capitalize;


  @media (max-width: 600px) { 
    width: 335px;
    margin: 0 auto;
  }

  @media (min-width: 600px) { 
    font-size: 64px;
    line-height: 120%; /* This equals 76.8px */
  }
`;

  const Subtitle = styled.h2`
  color: var(--text-color, #EFF2FD);
  text-align: center;
  font-feature-settings: 'calt' off;
  font-family: 'Gilroy';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 19.2px */

  @media (min-width: 600px) { 
    font-size: 32px;
    line-height: 120%; /* This equals 38.4px */
  }
`;


  const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
  background: linear-gradient(rgba(9, 15, 39, 0.32), rgba(9, 15, 39, 0.32)), url(/assets/header.jpg);
  background-size: cover, cover;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;

  @media (max-width: 600px) { /* Adjust the breakpoint as needed */
    height: calc(45vh);
  }
`;

  useEffect(() => {
    // If an item ID was provided, scroll it into view
    if (network) {
      const itemElement = document.getElementById(`network-${network}`);
      console.log({ id: `network-${network}` })
      if (itemElement) {
        itemElement.scrollIntoView({ inline: 'start', behavior: 'instant' });
        // itemElement.scrollIntoView({ inline: 'start', block: 'nearest', behavior: 'instant' });
      }
    }
  }, [network]);


  return (
    <>
      <Box>
        <StyledBox>
          <Title>Let's start a community of TV fans</Title>
          <Subtitle>Press "Chat" and post a message!</Subtitle>
        </StyledBox>
      </Box>


      <Box className='wrapper' >
        <Container maxWidth="xl">
          <NetworkSelector activeNetwork={network} />

          {categories.filter((category) => category.shows.length).map((category, index) =>
            <div key={`${network}-${category}-${index}`} style={{ margin: '100px 0' }}>
              <div>
                <ExpandableGrid tvShows={category.shows} handleChat={handleChat} title={category.title} />

              </div>
            </div>
          )}
        </Container>
      </Box >
    </>
  );
};

export default DisplayAllShows;

// style={{ marginLeft: 50, paddingLeft: 20, marginBottom: 20 }}