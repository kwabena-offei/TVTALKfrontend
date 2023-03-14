import {
  Grid,
  useTheme,
  useMediaQuery,
  Typography
} from "@mui/material";
import React from "react";
import NewsCard from "../../components/NewsCard";
import { NewsMainContainer } from "../../components/NewsCard/NewsCard.styled";
import useAxios from '../../services/api';
import { isAuthenticated } from "../../services/isAuth";
import { unAuthLikes } from "../../util/constants";
import { AuthContext } from "../../util/AuthContext";

export async function getServerSideProps(context) {
  const { axios } = useAxios(context)
  const isAuth = isAuthenticated(context)
  const { data: news } = await axios.get(`/news`);
  const { data: likes } = isAuth ? await axios.get(`/likes`) : unAuthLikes

  return {
    props: {
      news: news,
      likes: likes.stories,
      isAuth
    }, // will be passed to the page component as props
  };
}
const News = ({ news, likes, isAuth }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AuthContext.Provider value={isAuth}>
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
            <NewsCard {...newsItem} liked_by_auth_user={likes.includes(newsItem.id)} />
          </Grid>
        ))}
      </Grid>
    </NewsMainContainer>
    </AuthContext.Provider>
  );
};

export default News;
