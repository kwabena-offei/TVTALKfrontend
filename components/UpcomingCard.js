import { useState, useRef } from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Grid, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import HeartButton from '../components/HeartButton';
import BlueButton from '../components/BlueButton';
import Link from 'next/link';
import { styled } from '@mui/system';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function UpcomingCard() {
  const [expanded, setExpanded] = useState(false);

  const tvShows = [
    { title: "Friends", tmsId: '1'},
    { title: "Friends", tmsId: '2'},
    { title: "Friends", tmsId: '3'},
    { title: "Friends", tmsId: '4'},
    { title: "Friends", tmsId: '5'},
    { title: "Friends", tmsId: '6'},
    { title: "Friends", tmsId: '7'},
    { title: "Friends", tmsId: '8'},
  ];
  const tvShow = [
    { title: "Friends", tmsId: '1'},
    { title: "Friends", tmsId: '2'},
    { title: "Friends", tmsId: '3'},
    { title: "Friends", tmsId: '4'},
    { title: "Friends", tmsId: '5'},
    { title: "Friends", tmsId: '6'},
    { title: "Friends", tmsId: '7'},
    { title: "Friends", tmsId: '8'},
  ];

  const collapsedCount = 4;
  const displayedShows = expanded ? tvShows : tvShows.slice(0, collapsedCount);

  const Container = styled('div')(({ expanded }) => ({
    gap: '30px',
    overflowX: expanded ? 'hidden' : 'auto',
    overflowY: 'hidden',
    flexWrap: expanded ? 'wrap' : 'nowrap',
    display: 'flex',
    WebkitOverflowScrolling: 'touch',
    flexGrow: 1,
    scrollSnapType: 'both mandatory',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    msOverflowStyle: 'none',
    '& > div': {
      scrollSnapAlign: 'start',
    },
    '@media (min-width: 900px)': {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      overflowX: 'initial',
      maxHeight: expanded ? 'auto' : 'auto',
      overflow: 'hidden',
    },
  }));

  const Item = styled('div')(({ expanded }) => ({
    flex: '0 0 calc(80% - 30px)',
    ...(expanded && {
      flex: '0 0 100%',
    }),
    '@media (min-width: 900px)': {
      flex: 'initial',
    },
  }));

  const StyledTypography = styled(Typography)({
    color: '#EFF2FD',
    fontFamily: 'Gilroy',
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: '130%',
    letterSpacing: '0.4px',
    scrollSnapAlign: 'start',
    marginBottom: '25px',
    '@media (max-width: 600px)': {
      fontSize: '20px',
      marginBottom: '15px',
    },
  });


  return (
    <div style={{marginBottom: '80px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <StyledTypography>
          Upcoming
        </StyledTypography>

        {expanded ? <Button endIcon={<ExpandLessIcon />} style={{ color: '#FFF'}} variant='outlined' onClick={() => { setExpanded(false)}}>Close All</Button> : <Button style={{ color: '#FFF'  }} endIcon={<ExpandMoreIcon />} variant='outlined'  onClick={() => { setExpanded(true)}}>View All</Button>}
      </div>

      <Container expanded={expanded}>
        {displayedShows.map((tvShow, index) => (
          <Item key={index} expanded={expanded}>
            <Card key={`${tvShow.tmsId}`} sx={{ background: 'transparent' }}>
              <Image
                src='/assets/no-picture-available.jpg'
                // src={`https://${tvShow.preferred_image_uri}`}
                // alt={`${tvShow.title} Image`}
                width={720}
                height={540}
                layout="responsive"
                quality={75}
                loading='eager'
              />
              <CardContent sx={{ background: '#131B3F' }}>
                <Typography gutterBottom variant="h5" component="div" >
                  <h1 style={{ color: '#EFF2FD', fontSize: 25, fontWeight: 500, margin: '0' }}>Friends</h1>
                  <span style={{fontSize: '14px', paddingRight: '16px'}}>Network: TBSHD</span>
                  <span style={{fontSize: '14px'}}> Airtime: June 14, 7:30 pm </span>
                </Typography>
                <Grid container spacing={1}>
                  <Grid item>
                      <BlueButton
                        title='Chat'
                      />
                  </Grid>
                  <Grid item>
                      <Button style={{ background: '#090F27', borderRadius: '10000px', boxShadow: 'none' }} variant='contained'>
                        <Typography sx={{ color: '#919CC0' }} variant='string'>About</Typography>
                      </Button>
                  </Grid>
                  <Grid item>
                    <HeartButton  />
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

export default UpcomingCard;