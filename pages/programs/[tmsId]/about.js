
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import CustomSelect from '../../../components/CustomSelect';
import BackButton from '../../../components/BackButton';
import HeartButton from '../../../components/HeartButton';
import BlueButton from '../../../components/BlueButton';
import RatingButtonsGroup from '../../../components/RatingButtonsGroup';
import CastSlider from '../../../components/CastSlider';
import SeriesPhotoSlider from '../../../components/SeriesPhotosSlider';
import Container from '@mui/material/Container';
import Head from 'next/head';
import useAxios from "../../../services/api";
import Link from 'next/link';
import { useRouter } from 'next/router';


const StyledHeader = styled(Box)(({ backgroundImage }) => ({
  // maxHeight: '80vh',
  width: '100vw',
  display: 'block',
  justifyContent: 'center',
  marginLeft: -15,
  paddingLeft: 15,
  alignItems: 'center',
  backgroundSize: 'cover',
  backgroundBlendMode: 'multiply',
  backgroundPositionX: 'center',
  backgroundImage: `url(${backgroundImage})`,
  paddingBottom: 30,
  '@media (min-width: 780px)': {
    height: '960px',
    backgroundPositionX: 'calc(20vw)'
  }
}));

const GradientOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  right: 0,
  marginLeft: -15,
  bottom: 0,
  backgroundBlendMode: 'multiply',
  backgroundImage: 'linear-gradient(0deg, rgba(9, 15, 39, 1) 50%, rgba(9, 15, 39, 0) 65%)',
  '@media (min-width: 780px)': {
    backgroundImage: 'linear-gradient(90deg, rgba(9, 15, 39, 1) 50%, rgba(9, 15, 39, .2) 65%)'
  }
});

const StyledDescription = styled(Box)
  ({
    width: '700px',
    ['@media (max-width:780px)']: {
      width: '80%'
    }
  });

const StyledSelectsBox = styled(Box)
  ({
    width: '491px',
    marginTop: '10px',
    ['@media (max-width:780px)']: {
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: '0'
    }
  });

const StyledBottomBox = styled(Box)
  ({
    // marginLeft: '194px',
    ['@media (max-width:780px)']: {
      marginLeft: '18px',
    }
  });

const StyledDetailsBox = styled(Box)
  ({
    marginTop: 36,
    marginBottom: 24,
    width: '100%',
    ['@media (max-width:780px)']: {
      position: 'relative',
      marginTop: '15px',
      top: '0',
    }
  });

const StyledTitleBox = styled(Box)
  ({
    paddingTop: 145,
    marginBottom: 30,
    textAlign: 'left',
    ['@media (max-width:780px)']: {
      position: 'relative',
      top: '0',
    }
  });

export async function getStaticProps({ params }) {
  const { tmsId } = params;

  const detailsUrl = `https://api.tvtalk.app/shows/${tmsId}`;
  const photosUrl = `https://api.tvtalk.app/data/v1.1/programs/${tmsId}/images?imageAspectTV=4x3&imageSize=Md`;
  const heroImageUrl = `https://api.tvtalk.app/data/v1.1/programs/${tmsId}/images?imageAspectTV=4x3&imageSize=Ms&imageText=false`;

  const [detailsResponse, photosResponse, heroImageResponse] = await Promise.all([
    fetch(detailsUrl),
    fetch(photosUrl),
    fetch(heroImageUrl),
  ]);


  let details;
  let photos = [];

  try {
    details = await detailsResponse.json();
  } catch (error) {
    console.error("Error parsing details response:", error);
  }

  try {
    photos = await photosResponse.json();
  } catch (error) {
    console.error("Error parsing photos response:", error);
  }
  if (!details) {
    const otherDetailsUrl = `https://api.tvtalk.app/data/v1.1/programs/${tmsId}`;
    const otherDetailsResponse = await fetch(otherDetailsUrl);
    details = await otherDetailsResponse.json();
  }

  let heroImage = `https://${details.preferred_image_uri}`;

  try {
    let heroImages = await heroImageResponse.json();
    heroImage = heroImages.find(({ category }) => category === 'Iconic') || heroImages[0];
    heroImage = `https://${heroImage?.uri}`;
  } catch (error) {
    console.error("Error fetching hero image:", error);
  }

  if (details.cast) {
    try {
      details.cast = await Promise.all(details.cast.map(async (actor) => {
        const actorImagesUrl = `https://api.tvtalk.app/data/v1.1/celebs/${actor.personId}/images?imageSize=Md`;
        const actorImagesResponse = await fetch(actorImagesUrl);
        const actorImages = await actorImagesResponse.json();
        const actorImage = actorImages.find((image) => image.seriesId === tmsId) || actorImages[0];
        actor.imageUrl = `https://${actorImage?.uri}`;
        return actor;
      }));
    } catch (error) {
      console.error("Error fetching cast images:", error);
    }
  } else {
    details.cast = [];
  }

  details.ranking_cache = details.ranking_cache || {};

  return {
    props: {
      details,
      photos,
      heroImage
    }
  };
}

export async function getStaticPaths() {
  // If you can fetch a list of all possible tmsId values, do it here.
  // For this example, I'll assume you can't, so we'll use fallback mode.

  return {
    paths: [], // Empty array means no paths are pre-rendered.
    fallback: 'blocking' // 'blocking' means new paths will be generated on-demand without showing a loading state.
  };
}



const About = ({ heroImage, details, photos }) => {
  const { axios } = useAxios();
  const router = useRouter();
  const [ratingCache, setRatingCache] = useState(details.rating_percentage_cache);
  const [userRating, setUserRating] = useState('');

  const {
    preferred_image_uri,
    title,
    longDescription,
    releaseYear,
    genres,
    tmsId
  } = details;

  const handleSeasonChange = () => { /* ... */ }
  const handleEpisodeChange = () => { /* ... */ }

  const onRate = async (rating) => {
    try {
      const resp = await axios.post(`/shows/${tmsId}/ratings`, { rating });
      setRatingCache(resp.data);
      setUserRating(rating);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        router.push(`/login`);
      }
    }
  }

  const genresString = genres.join('-');
  const releaseYearAndGenres = [releaseYear, genresString].filter(Boolean).join(' / ');

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const resp = await axios.get(`/shows/${tmsId}/ratings`);
        setUserRating(resp.data.rating);
      } catch (error) {
        console.error("Failed to fetch user rating:", error);
      }
    };

    fetchUserRating();
  }, [tmsId]);

  return (
    <>
      <Head>
        <title>About {title} | TV Talk</title>
        <meta property="og:title" content={`About ${title} | TV Talk`} />
        <meta property="og:description" content={`Learn and chat about ${title} at TV Talk`} />
        <meta property="og:image" content={heroImage} />
      </Head>

      <Container maxWidth="xl">
        <Box sx={{ position: 'relative' }} >
          <GradientOverlay />
          <StyledHeader backgroundImage={heroImage} >
            <div style={{ width: '100%', margin: '0 auto', position: 'relative' }}>
              <BackButton
                title='Back'
              />
              <StyledTitleBox
                sx={{
                  zIndex: 10,
                  textAlign: 'left',
                  marginTop: '136px'
                }}
              >
                <Typography
                  sx={{ color: '#EFF2FD', fontWeight: 700, textAlign: 'left' }}
                  variant='h2'>
                  {title}
                </Typography>
                <Typography
                  sx={{ color: '#454F75', zIndex: 1, fontSize: '20px', fontWeight: 500 }}
                  variant='h1'>
                  {releaseYearAndGenres}
                </Typography>
              </StyledTitleBox>
              <StyledDetailsBox>
                <StyledSelectsBox sx={{ display: 'flex', gap: '29px', marginBottom: '22px' }}>
                  <CustomSelect
                    selectList={['1', '2', '3']}
                    label='Select Season'
                    labelId='selectSeason'
                    selectId='selectSeason'
                    handleChange={handleSeasonChange}
                  />
                  <CustomSelect
                    selectList={['1', '2', '3']}
                    label='Select Episode'
                    labelId='selectEpisode'
                    selectId='selectEpisode'
                    handleChange={handleEpisodeChange}
                  />
                </StyledSelectsBox>
                <StyledDescription sx={{ zIndex: 1, textAlign: 'left' }}>
                  <Typography
                    sx={{ color: '#A5B0D6', fontSize: '16px', lineHeight: '1.8em', textAlign: 'left' }}
                    variant='string'>
                    {longDescription}
                  </Typography>
                </StyledDescription>
                <Box sx={{ display: 'flex', gap: '20px', marginTop: '36px' }}>
                  <Link href={`/chat/${tmsId}`}>
                    <BlueButton
                      title='Chat'
                    />
                  </Link>
                  <HeartButton />
                </Box>
              </StyledDetailsBox>
            </div>
          </StyledHeader>
        </Box>

        <StyledBottomBox>
          <RatingButtonsGroup
            userRating={userRating}
            love={ratingCache.love}
            like={ratingCache.like}
            dislike={ratingCache.dislike}
            onRate={onRate}
            tmsId={tmsId}
          />
          <CastSlider photos={photos} cast={details.cast} />
          <SeriesPhotoSlider photos={photos} />
        </StyledBottomBox>
      </Container >
    </>
  );
};

export default About;
