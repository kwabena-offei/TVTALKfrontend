import React from 'react';
import { Button, Grid, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Carousel from 'react-elastic-carousel';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from 'next/router'


const DisplayAllShows = ({ shows }) => {
    const router = useRouter()

    const convertToSlug = (name) => {
        let slug = ''
        slug = name.replace('%20', '-').toLowerCase()
        return slug
    }

    // Pushes tmsID to the about page
    const handleAbout = (tmsId, title) => {
        // converts the title 
        // let slug = convertToSlug(title)
        // `/${slug}`
        router.push({ pathname: '/about', query: { tmsId: tmsId } })
    }

    return (
        <Box className='wrapper'>
            {shows.map((show, index) =>
                <div key={index} style={{ margin: '100px 0' }}>
                    {/* <Accordion sx={{
                        boxShadow:'none',
                        padding: 0,
                        '& .MuiCollapse-root': {
                            
                            minHeight: '370px !important',
                            visibility: 'visible !important'
                        },
                        '& .MuiAccordion-root': {
                            backgroundColor: 'transparent !important'
                        }
                    }} style={{ background: 'transparent' }} >
                        <AccordionSummary
                            style={{ padding: 0 }}
                            expandIcon={<Button style={{ color: '#FFF' }} variant='outlined'>Show All</Button>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={{ color: '#FFF' }}>{show.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ padding: 0 }}> */}
                        <Typography></Typography>
                    <Carousel itemsToShow={4} itemsToScroll={4} pagination={false} itemPadding={[0, 10]}>

                        {/* <Grid container spacing={5}> */}
                        {show.shows.map((tvShow, ind) =>
                            <Card key={ind} sx={{ background: 'transparent' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={tvShow.preferred_image_uri}
                                    alt="green iguana"
                                />
                                <CardContent sx={{ background: '#131B3F' }}>
                                    <Typography sx={{ color: '#EFF2FD' }} gutterBottom variant="h5" component="div">
                                        {tvShow.title}
                                    </Typography>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <Button style={{ background: '#3361FF', borderRadius: '10000px' }} variant='contained'>
                                                <Typography sx={{ color: '#EFF2FD' }} variant='string'>Chat</Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button onClick={() => handleAbout(tvShow.tmsId)} style={{ background: '#090F27', borderRadius: '10000px', boxShadow: 'none' }} variant='contained'>
                                                <Typography sx={{ color: '#919CC0' }} variant='string'>About</Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <IconButton style={{ background: '#090F27', borderRadius: '10000px', boxShadow: 'none' }} variant='contained'>
                                                <FavoriteBorderIcon htmlColor='#919CC0' />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </CardContent>

                            </Card>
                            // </div>

                            // </Grid>
                        )}
                        {/* </Grid> */}
                    </Carousel>

                    {/* </AccordionDetails>
                    </Accordion> */}



                </div>
            )}
        </Box>

    );
};

export default DisplayAllShows;