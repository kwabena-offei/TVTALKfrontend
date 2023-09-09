import React from 'react';
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

const StyledHeader = styled(Box)`
    height: 960px;
    width: 100vw;
    display: flex;
    justifyContent: center;
    alignItems: center;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, rgba(9, 15, 39, 1) 50%, rgba(9, 15, 39, .2) 65%);
        background-blend-mode: multiply;
    }

    @media (max-width: 780px) {
        height: 400px;
    }
`;

const StyledContentWrapper = styled(Box, `
`)

const StyledDescription = styled(Box, {})
  ({
    width: '700px',
    ['@media (max-width:780px)']: {
      width: '80%'
    }
  });

const StyledSelectsBox = styled(Box, {})
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

const StyledBottomBox = styled(Box, {})
  ({
    // marginLeft: '194px',
    ['@media (max-width:780px)']: {
      marginLeft: '18px',
    }
  });

const StyledDetailsBox = styled(Box, {})
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

const StyledTitleBox = styled(Box, {})
  ({
    textAlign: 'left',
    ['@media (max-width:780px)']: {
      position: 'relative',
      top: '0',
    }
  });

export async function getServerSideProps({ req, res, query }) {
  // Set cache for a week
  res.setHeader('Cache-Control', 'public, s-maxage=604800, stale-while-revalidate=86400');

  const detailsUrl = `https://api.tvtalk.app/shows/${query.tmsId}`;
  const photosUrl = `https://api.tvtalk.app/data/v1.1/programs/${query.tmsId}/images?imageAspectTV=4x3&imageSize=Md`;
  const heroImageUrl = `https://api.tvtalk.app/data/v1.1/programs/${query.tmsId}/images?imageAspectTV=4x3&imageSize=Ms&imageText=false`;

  const [detailsResponse, photosResponse, heroImageResponse] = await Promise.all([
    fetch(detailsUrl),
    fetch(photosUrl),
    fetch(heroImageUrl),
  ]);

  const details = await detailsResponse.json();
  const photos = await photosResponse.json();
  const heroImages = await heroImageResponse.json();
  const heroImage = heroImages.find(({ category }) => category === 'Iconic') || heroImages[0];



  if (details.cast) {
    details.cast = await Promise.all(details.cast.map(async (actor) => {
      const actorImagesUrl = `https://api.tvtalk.app/data/v1.1/celebs/${actor.personId}/images?imageSize=Md`;
      const actorImagesResponse = await fetch(actorImagesUrl);
      const actorImages = await actorImagesResponse.json();
      const actorImage = actorImages.find((image) => image.seriesId === query.tmsId) || actorImages[0];
      actor.imageUrl = `https://${actorImage?.uri}`;
      return actor;
    }));
  } else {
    details.cast = [];
  }

  return {
    props: {
      details,
      photos,
      heroImage: `https://${heroImage?.uri}`
    }
  };
}

const about = ({ heroImage, details, photos }) => {

  const {
    preferred_image_uri,
    title, longDescription,
    releaseYear,
    genres, tmsId, rating_percentage_cache } = details;

  const handleSeasonChange = () => {

  }

  const handleEpisodeChange = () => {

  }

  const genresString = genres.join('-');
  const releaseYearAndGenres = [releaseYear, genresString].filter(Boolean).join(' / ');

  return (
    <>
      <Head>
        <title>About {title} | TV Talk</title>
        <meta property="og:title" content={`About ${title} | TV Talk`} />
        <meta property="og:description" content={`Learn and chat about ${title} at TV Talk`} />
        <meta property="og:image" content={heroImage} />
        {/* <meta property="og:url" content="URL_TO_YOUR_PAGE" /> */}
        {/* Add other meta tags as needed */}
      </Head>

      <Container maxWidth="xl">
        <Box className="about" sx={{ position: 'relative' }} >

          <StyledHeader
            className="about__header"
            style={{
              background: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'multiply',
              backgroundPositionX: 'calc(20vw)'
            }}
          >
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
                  sx={{ color: '#EFF2FD', zIndex: 1, fontWeight: 700, textAlign: 'left' }}
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
                  <BlueButton
                    title='Chat'
                  />
                  <HeartButton />
                </Box>
              </StyledDetailsBox>
            </div>
          </StyledHeader>


          <div style={{ width: 'calc(100vw)', margin: '0', marginLeft: 0, paddingLeft: 0, position: 'relative' }}>

            <StyledBottomBox>
              <RatingButtonsGroup
                love={rating_percentage_cache.love}
                like={rating_percentage_cache.like}
                dislike={rating_percentage_cache.dislike}
              />
              <CastSlider
                photos={photos}
                cast={details.cast}
              />
              <SeriesPhotoSlider
                photos={photos}
              />
            </StyledBottomBox>
          </div>
        </Box >
      </Container>
    </>
  );
};

export default about;