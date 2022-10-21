import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';



export async function getServerSideProps(context) {
    let res = await fetch(`https://api.tvtalk.app/news`)
    console.log(res)
    let news = await res.json()
    console.log(news)
    return {
        props: {
            news: news
        }, // will be passed to the page component as props
    }
}
const news = ({ news }) => {
    console.log(news)
    return (
        <>
            <Grid container spacing={4} className='wrapper'>
                {news.map((newsItem, ind) =>
                    <Grid item>

                        <Card key={ind} sx={{ background: 'transparent', width: '400px' }}>
                            <CardMedia>
                                <div style={{ overflow: 'hidden', height: '190px' }}>
                                    <img src={`${newsItem.image_url}?width=1000`} style={{ width: '100%' }} />
                                </div>
                            </CardMedia>
                            <CardContent sx={{ background: '#131B3F' }}>
                                <Typography sx={{ color: '#EFF2FD' }} gutterBottom variant="h5" component="div">
                                    {newsItem.title}
                                </Typography>

                                <Typography className="news__description" sx={{ color: '#EFF2FD', fontWeight: 100, fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} gutterBottom variant="string" component="div">
                                    {newsItem.description}
                                </Typography>
                                <Grid container spacing={1} style={{ marginTop: '10px' }} >
                                    <Grid item>
                                        <Button style={{ background: '#3361FF', borderRadius: '10000px' }} variant='contained'>
                                            <Typography sx={{ color: '#EFF2FD' }} variant='string'>Read More</Typography>
                                        </Button>

                                    </Grid>
                                    {/* <Grid item>
                                        <Button onClick={() => handleAbout(tvShow.tmsId)} style={{ background: '#090F27', borderRadius: '10000px', boxShadow: 'none' }} variant='contained'>
                                            <Typography sx={{ color: '#919CC0' }} variant='string'>About</Typography>
                                        </Button>
                                    </Grid> */}
                                        <Grid item>
                                            <IconButton style={{ background: '#090F27', borderRadius: '10000px', boxShadow: 'none' }} variant='contained'>
                                                <FavoriteBorderIcon htmlColor='#919CC0' />
                                            </IconButton>
                                        </Grid>
                                        {/* <Grid item>
                                            <IconButton style={{ background: '#090F27', borderRadius: '10000px', boxShadow: 'none' }} variant='contained'>
                                                <FavoriteBorderIcon htmlColor='#919CC0' />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton style={{ background: '#090F27', borderRadius: '10000px', boxShadow: 'none' }} variant='contained'>
                                                <FavoriteBorderIcon htmlColor='#919CC0' />
                                            </IconButton>
                                        </Grid> */}

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    // </div>

                    // </Grid>
                )}
            </Grid>

        </>
    );
};



export default news;