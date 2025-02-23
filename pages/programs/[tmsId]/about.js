
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import BackButton from '../../../components/BackButton';
import HeartButton from '../../../components/HeartButton';
import BlueButton from '../../../components/BlueButton';
import SeasonEpisodeSelector from '../../../components/SeasonEpisodeSelector';
import RatingButtonsGroup from '../../../components/RatingButtonsGroup';
import CastSlider from '../../../components/CastSlider';
import SeriesPhotoSlider from '../../../components/SeriesPhotosSlider';
import Container from '@mui/material/Container';
import Head from 'next/head';
import useAxios from "../../../services/api";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { buildAPIUrl } from '../../../services/api';

const StyledHeader = styled(Box)(({ backgroundImageDesktop, backgroundImageMobile }) => ({
  width: '100vw',
  display: 'block',
  justifyContent: 'center',
  marginLeft: -15,
  paddingLeft: 15,
  alignItems: 'center',
  backgroundSize: 'contain',
  backgroundBlendMode: 'multiply',
  backgroundPositionX: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${backgroundImageMobile})`,
  paddingBottom: 30,
  '@media (min-width: 780px)': {
    height: '960px',
    backgroundSize: 'cover',
    backgroundPositionX: 'calc(20vw)',
    backgroundImage: `url(${backgroundImageDesktop})`,
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
  backgroundImage: 'linear-gradient(0deg, rgba(9, 15, 39, 1) 50%, rgba(9, 15, 39, 0) 70%)',
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

  const detailsUrl = buildAPIUrl(`/shows/${tmsId}`);
  const photosUrl = buildAPIUrl(`/data/v1.1/programs/${tmsId}/images?imageSize=Ms&imageText=false`);

  const [detailsResponse, photosResponse] = await Promise.all([
    fetch(detailsUrl),
    fetch(photosUrl),
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
    if (!Array.isArray(photos)) {
      photos = [];
    }
  } catch (error) {
    photos = []
    console.error("Error parsing photos response:", error);
  }

  if (!details) {
    const otherDetailsUrl = buildAPIUrl(`/data/v1.1/programs/${tmsId}`);
    const otherDetailsResponse = await fetch(otherDetailsUrl);
    details = await otherDetailsResponse.json();
  }

  let defaultImage = `https://${details.preferred_image_uri}`;
  let heroImageDesktop = defaultImage;
  let heroImageMobile = defaultImage;
  try {
    heroImageDesktop = photos.find((photo) => photo.aspect === '16x9' && photo.category === 'Iconic') || photos[0];
    heroImageDesktop = `https://${heroImageDesktop.uri}`;

    heroImageMobile = photos.find((photo) => photo.aspect === '2x3' && photo.category === 'Iconic') || photos[0];
    heroImageMobile = `https://${heroImageMobile.uri}`;
  } catch (error) {
    console.log(error)
  }

  if (details.cast) {
    try {
      details.cast = await Promise.all(details.cast.map(async (actor) => {
        const actorImagesUrl = buildAPIUrl(`/data/v1.1/celebs/${actor.personId}/images?imageSize=Md`);
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

  console.log({ details })
  details.rating_percentage_cache = details.rating_percentage_cache || {};

  return {
    props: {
      details,
      photos,
      heroImageDesktop: heroImageDesktop || defaultImage,
      heroImageMobile: heroImageMobile || defaultImage
    }
  };
}

export async function getStaticPaths() {
  const categoryResponse = await fetch(buildAPIUrl('/categories'))
  const json = await categoryResponse.json()
  const paths = []
  json.map((category) => {
    category.shows.map((show) => {
      paths.push({
        params: {
          tmsId: show.tmsId
        }
      })
    })
  })

  return {
    paths: paths,
    fallback: 'blocking'
  };
}



const About = ({ heroImageDesktop, heroImageMobile, details, photos }) => {
  const { axios } = useAxios();
  const router = useRouter();
  const [ratingCache, setRatingCache] = useState(details.rating_percentage_cache || {});
  const [userRating, setUserRating] = useState('');

  const {
    preferred_image_uri,
    title,
    longDescription,
    releaseYear,
    genres,
    tmsId,
    totalSeasons
  } = details;

  console.log({ ratingCache })

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
        <meta property="og:image" content={heroImageDesktop} />
      </Head>

      <Container maxWidth="xl">
        <Box sx={{ position: 'relative' }} >
          <GradientOverlay />
          <StyledHeader backgroundImageDesktop={heroImageDesktop} backgroundImageMobile={heroImageMobile} >
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
                  <SeasonEpisodeSelector totalSeasons={totalSeasons} tmsId={tmsId} />
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
                  <HeartButton identifier={{ tmsId }} itemId={tmsId} itemType={'shows'} />
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
          <CastSlider cast={details.cast} tmsId={details.tmsId} />
          <SeriesPhotoSlider photos={photos} tmsId={details.tmsId} />
        </StyledBottomBox>
      </Container >
    </>
  );
};

export default About;
