import {
  Grid,
  useTheme,
  useMediaQuery,
  Typography
} from "@mui/material";
import React from "react";
import axios from "axios";
import { TV_TALK_API } from "../../util/constants";
import NewsCard from "../../components/NewsCard";
import { NewsMainContainer } from "../../components/NewsCard/NewsCard.styled";
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
          </Grid>
        ))}
      </Grid>
    </NewsMainContainer>
  );
};

export default News;
