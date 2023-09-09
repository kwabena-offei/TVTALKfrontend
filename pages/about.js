import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import CustomSelect from '../components/CustomSelect';
import BackButton from '../components/BackButton';
import HeartButton from '../components/HeartButton';
import BlueButton from '../components/BlueButton';
import RatingButtonsGroup from '../components/RatingButtonsGroup';
import CastSlider from '../components/CastSlider';
import SeriesPhotoSlider from '../components/SeriesPhotosSlider';
import Container from '@mui/material/Container';

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
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, rgba(9, 15, 39, 1) 40%, rgba(9, 15, 39, .2) 60%);
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
    marginLeft: '194px',
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

export async function getServerSideProps(context) {
  let detailsResult = await fetch(`https://api.tvtalk.app/shows/${context.query.tmsId}`)
  let photosResults = await fetch(`https://api.tvtalk.app/data/v1.1/programs/${context.query.tmsId}/images?imageSize=Md`)
  let heroImageResult = await fetch(
    `https://api.tvtalk.app/data/v1.1/programs/${context.query.tmsId}/images?imageAspectTV=4x3&imageSize=Ms&imageText=false`)
  let details = await detailsResult.json()
  let photos = await photosResults.json()
  let heroImages = await heroImageResult.json()
  let heroImage = heroImages.find(({ category }) => { return category === 'Iconic' }) || heroImages[0]

  return {
    props: {
      details: details,
      photos: photos,
      heroImage: `https://${heroImage?.uri}`
    }, // will be passed to the page component as props
  }
}

const about = ({ heroImage, details, photos }) => {

  const {
    preferred_image_uri,
    title, longDescription,
    releaseYear,
    genres, tmsId,
    rating_percentage_cache } = details;
  // let image = preferred_image_uri.match(/(^.*)?\?/)[1];

  const handleSeasonChange = () => {

  }

  const handleEpisodeChange = () => {

  }

  console.log({ heroImage })


  return (
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
                {`${releaseYear} / ${genres.join('-')}`}
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
      </Box >
    </Container>
  );
};

export default about;