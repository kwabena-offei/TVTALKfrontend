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
    router.push({ pathname: '/about', query: { tmsId: tmsId } })
  }
  const handleChat = (tmsId, title) => {
    router.push({ pathname: '/chat/[tmsId]', query: { tmsId: tmsId } })
  }

  useEffect(() => {
    // This code will only run in the client-side environment
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // The empty array means this useEffect will run once when the component mounts

  const objectWidth = 360;
  // Ensure that windowWidth is defined before performing calculations or rendering dependent content
  const numberOfObjects = windowWidth ? Math.floor(windowWidth / objectWidth) : 0;

  return (
    <>
      <Box>
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 600,
          background: `linear-gradient(rgba(9, 15, 39, 0.32), rgba(9, 15, 39, 0.32)), url(/assets/header.jpg)`,
          backgroundSize: 'cover, cover',
          backgroundPosition: 'center, center',
          backgroundRepeat: 'no-repeat, no-repeat'
        }}>
          <Typography sx={{ color: 'white' }} style={{
            textAlign: 'center',
            fontFeatureSettings: "'calt' off",
            fontFamily: 'Gilroy',
            fontSize: '64px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '120%',
            display: 'block'
          }}>Let's start a community of TV fans </Typography>
          <Typography sx={{ color: 'white' }} style={{
            textAlign: 'center',
            fontFeatureSettings: "'calt' off",
            fontFamily: 'Gilroy',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '120%', // This equals 38.4px
          }}>Press "Chat" and post a message!</Typography>
        </Box>
      </Box>


      <Box className='wrapper'>

        <div style={{ marginLeft: 50, paddingLeft: 20, marginBottom: 20 }}>
          <NetworkSelector activeNetwork={network} />
        </div>

        {categories.filter((category) => category.shows.length).map((category, index) =>
          <div key={`${network}-${category}-${index}`} style={{ margin: '100px 0' }}>
            <div style={{ marginLeft: 50, paddingLeft: 20, marginBottom: 20 }}>
              <Typography style={{
                color: '#EFF2FD',
                fontFamily: 'Gilroy',
                fontSize: 40,
                fontWeight: 700,
                lineHeight: '130%', /* 52px */
                letterSpacing: 0.4,
              }}>{category.title}</Typography></div>
            <Carousel itemsToShow={numberOfObjects} itemsToScroll={numberOfObjects / 2} pagination={false} itemPadding={[0, 10]} itemPosition='START'>

              {category.shows.map((tvShow, ind) => {
                return <Card key={ind} sx={{ background: 'transparent', maxWidth: 360 }}>
                  <CardMedia
                    componnt="img"
                  >
                    <Image
                      src={`https://${tvShow.preferred_image_uri}`}
                      alt={`${tvShow.title} Image`}
                      width={720}
                      height={540}
                      quality={80}
                    />
                  </CardMedia>
                  <CardContent sx={{ background: '#131B3F' }}>
                    <Typography sx={{ color: '#EFF2FD' }} gutterBottom variant="h5" component="div">
                      {tvShow.title}
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
              }
              )}
            </Carousel>
          </div>
        )}
      </Box >
    </>
  );
};

export default DisplayAllShows;