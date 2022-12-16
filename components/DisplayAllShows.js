import React from 'react';
import { Button, Grid, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Carousel from 'react-elastic-carousel';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import header from '/assets/header.png'
import { useRouter } from 'next/router'
import HeartButton from '../components/HeartButton';
import BlueButton from '../components/BlueButton';

const DisplayAllShows = ({ shows }) => {
    const router = useRouter()

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

        router.push({ pathname: '/chat', query: { tmsId: tmsId } })
    }

    return (
        <>
            <Box style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 4}}>
                    <Typography sx={{color: 'white'}}>Let's start a community of TV fans </Typography>
                    <Typography sx={{color: 'white'}}>Press "Chat" and post a message!</Typography>
                </Box>
                <Box style={{position: 'absolute', top:0, bottom: 0, left: 0, right: 0, background: 'rgba(9, 15, 39, 0.32)',}}/>
                <img src='/assets/header.jpg' width='100%'/>
            </Box>
            <Box className='wrapper'>


                {/* <Accordion sx={{
                    boxShadow: 'none',
                    padding: 0,
                    '& .MuiCollapse-root': {

                        minHeight: '200px !important',
                        visibility: 'visible !important'
                    },
                    '& .MuiAccordion-root': {
                        backgroundColor: 'red !important'
                    }
                }} style={{ background: 'blue' }} >


                    <AccordionSummary
                        style={{ padding: 0 }}
                        expandIcon={<Button style={{ color: '#FFF' }} variant='outlined'>Show All</Button>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography style={{ color: '#FFF' }}>Test</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ padding: 0 }}>
                        <Box sx={{ background: '' }}></Box>
                    </AccordionDetails>
                </Accordion> */}
                {shows.map((show, index) =>
                    <div key={index} style={{ margin: '100px 0' }}>






                        <Typography></Typography>
                        <Carousel itemsToShow={4} itemsToScroll={4} pagination={false} itemPadding={[0, 10]}>

                            {show.shows.map((tvShow, ind) =>
                                <Card key={ind} sx={{ background: 'transparent' }}>
                                    <CardMedia
                                        component="img"
                                        image={tvShow.preferred_image_uri}

                                    />
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

                            )}
                        </Carousel>

                        {/* </AccordionDetails>
                    </Accordion> */}



                    </div>
                )}
            </Box>
        </>


    );
};

export default DisplayAllShows;