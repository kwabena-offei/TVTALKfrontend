import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { styled } from '@mui/system';
import { VerticalAlignBottom } from '@mui/icons-material';


export async function getServerSideProps(context) {
    let res = await fetch(`https://api.tvtalk.app/news`)
    let news = await res.json()
    console.log(news)
    return {
        props: {
            news: news
        }, // will be passed to the page component as props
    }
}

const handleReadMore = () => {

}


const StyledGrid = styled(Grid, {})({
    width: 1480
})

const StyledTitle = styled(Typography, {
    name: "Title", // Changes class name in the DOM 
    slot: "title" // appends slot name to the name above in the DOM
})({
        fontSize: '22px',
        fontWeight: 500,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: 2,
        minHeight: 65,
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box'
    })
const StyledText = styled(Typography, {})({
        margin: '12px 0 24px 0',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box',
        color: '#EFF2FD',
        fontSize: 16,
        minHeight: 75,
        fontWeight: 300
})



const news = ({ news }) => {
    return (
        <>
        <Box  display={'flex'} justifyContent='center'>
      
            <StyledGrid container spacing={4}>
                {news.map((newsItem, ind) =>
                    <Grid item xs={4} >

                        <Card key={ind} sx={{ background: 'transparent' }}>
                            <CardMedia>
                                <div style={{ overflow: 'hidden', height: '190px' }}>
                                    <img src={`${newsItem.image_url}?width=1000`} style={{ width: '100%' }} />
                                </div>
                            </CardMedia>
                            <CardContent sx={{ background: '#131B3F' }}>
                                <StyledTitle sx={{ color: '#EFF2FD' }} variant='string'>
                                    {newsItem.title}
                                </StyledTitle>

                                <StyledText gutterBottom variant="string" component="div">
                                    {newsItem.description}
                                </StyledText>
                                <Grid container spacing={1} style={{ marginTop: '10px' }} >
                                    <Grid item>
                                        <Button style={{ background: '#3361FF', borderRadius: '10000px' }} onClick={handleReadMore} variant='contained'>
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
                )}
            </StyledGrid>
        </Box>
 
        
            

        </>
    );
};



export default news;