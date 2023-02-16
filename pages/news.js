import {
  Grid,
  useTheme,
  useMediaQuery,
  Typography
} from "@mui/material";
import React from "react";
import axios from "axios";
import { TV_TALK_API } from "../util/constants";
import NewsCard from "../components/NewsCard";
import { NewsMainContainer } from "../components/NewsCard/NewsCard.styled";
// import useAxios from '../services/api';

export async function getServerSideProps(context) {
  // const { axios } = useAxios(context)
  const { data: news } = await axios.get(`${TV_TALK_API}/news`);
  console.log(news);
  return {
    props: {
      news: news,
    }, // will be passed to the page component as props
  };
}
const News = ({ news }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(news);
  return (
    <>
    <NewsMainContainer sx={{ marginBottom: "5vh" }} maxWidth="xl">
      <Typography
        variant='h2'
        fontWeight={700}
        fontSize={isMobile ? '2.25rem' : '4rem'}
        textAlign='center'
        marginY={isMobile ? '20px' : '60px'}
        >
        News
      </Typography>
      <Grid container spacing={3}>
        {news.map((newsItem) => (
          <Grid item key={newsItem.id} xs={12} md={6} lg={4}>
            <NewsCard {...newsItem} />

            {/* <Card key={ind} sx={{ background: 'transparent', width: '400px' }}>
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
                              <Grid item>
                                  <IconButton style={{ background: '#090F27', borderRadius: '10000px', boxShadow: 'none' }} variant='contained'>
                                      <FavoriteBorderIcon htmlColor='#919CC0' />
                                  </IconButton>
                              </Grid>
                              <Grid item>
                                  <IconButton style={{ background: '#090F27', borderRadius: '10000px', boxShadow: 'none' }} variant='contained'>
                                      <FavoriteBorderIcon htmlColor='#919CC0' />
                                  </IconButton>
                              </Grid>

                      </Grid>
                    </CardContent>
              </Card> */}
          </Grid>
        ))}
      </Grid>
    </NewsMainContainer>
    </>
  );
};

export default News;
