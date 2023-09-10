import { useState, useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Grid, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import HeartButton from '../components/HeartButton';
import BlueButton from '../components/BlueButton';


function ExpandableGrid({ tvShows, title }) {
  const [expanded, setExpanded] = useState(false);

  const collapsedCount = 4;
  const displayedShows = expanded ? tvShows : tvShows.slice(0, collapsedCount);

  const Container = styled.div`
  gap: 30px;
  overflow-x: ${props => props.expanded ? 'hidden' : 'auto'};
  overflow-y: hidden; /* Prevent vertical scrolling */
  flex-wrap: ${props => props.expanded ? 'wrap' : 'nowrap'};
  display: flex;
  -webkit-overflow-scrolling: touch;
  flex-grow: 1;

  /* Scroll Snap */
  scroll-snap-type: both mandatory;

  /* Hide scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE and Edge */
  -ms-overflow-style: none;

  /* Children styles for scroll snap */
  & > div {
    scroll-snap-align: start;
  }

  /* Desktop */
  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    overflow-x: initial;
    max-height: ${props => props.expanded ? 'auto' : '360px'};
    overflow: hidden;
  }
`;

  const Item = styled.div`
    flex: 0 0 calc(80% - 30px); /* Default for mobile horizontal scrolling, 1.25 items visible */

    /* Expanded state on mobile */
    ${props => props.expanded && `
      flex: 0 0 100%; /* Take full width when expanded */
    `}

    /* Desktop */
    @media (min-width: 900px) {
      flex: initial;
    }
  `;


  const StyledTypography = styled(Typography)`
    color: #EFF2FD;
    font-family: 'Gilroy';
    font-size: 40px;
    font-weight: 700;
    line-height: 130%;
    letter-spacing: 0.4px;
    margin-bottom: 25px;

    /* Mobile */
    @media (max-width: 600px) {
      font-size: 20px;
      margin-bottom: 15px;
    }
  `;


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <StyledTypography>
          {title}
        </StyledTypography>

        <Button style={{ color: '#FFF', marginTop: '-1em' }} variant='outlined' onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Close All' : 'Show All'}
        </Button>
      </div>

      <Container expanded={expanded}>
        {displayedShows.map((tvShow, index) => (
          <Item key={index} expanded={expanded}>
            <Card key={`${tvShow.tmsId}`} sx={{ background: 'transparent' }}>
              <Image
                src={`https://${tvShow.preferred_image_uri}`}
                alt={`${tvShow.title} Image`}
                width={720}
                height={540}
                layout="responsive"
                quality={75}
                loading='eager'
              />
              <CardContent sx={{ background: '#131B3F' }}>
                <Typography gutterBottom variant="h5" component="div" >
                  <h1 style={{ color: '#EFF2FD', fontSize: 18, fontWeight: 500 }}>{tvShow.title}</h1>

                </Typography>
                <Grid container spacing={1}>
                  <Grid item>
                    <BlueButton
                      title='Chat'
                      onClick={() => handleChat(tvShow.tmsId)}
                    />
                  </Grid>
                  <Grid item>
                    <Button onClick={() => handleAbout(tvShow.tmsId)} style={{ background: '#090F27', borderRadius: '10000px', boxShadow: 'none' }} variant='contained'>
                      <Typography sx={{ color: '#919CC0' }} variant='string'>About</Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <HeartButton />
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

export default ExpandableGrid;
