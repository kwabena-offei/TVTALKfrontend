import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomSelect from '../components/CustomSelect';
import BackButton from '../components/BackButton';
import HeartButton from '../components/HeartButton';
import BlueButton from '../components/BlueButton';
import RatingButtonsGroup from '../components/RatingButtonsGroup';
import CastSlider from '../components/CastSlider';
import SeriesPhotoSlider from '../components/SeriesPhotosSlider';
import { styled } from '@mui/system';

const StyledHeader = styled(Box, {})
    ({
        height: '960px',
        width: '100vw', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        ['@media (max-width:780px)'] : {
            height: '400px',
          }
    });

const StyledDescriprion = styled(Box, {})
    ({
        width: '700px',
        ['@media (max-width:780px)'] : {
            width: '80%'
          }
    });

const StyledSelectsBox = styled(Box, {})
    ({
        width: '491px',
        ['@media (max-width:780px)'] : {
            width: '80%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }
    });

const StyledBottomBox = styled(Box, {})
    ({
        marginLeft: '194px',
        ['@media (max-width:780px)'] : {
            marginLeft: '20px',
          }
    });

const StyledDetailsBox = styled(Box, {})
    ({
        position: 'absolute',
        top: '525px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ['@media (max-width:780px)'] : {
            position: 'relative',
            marginTop: '15px',
            top: '0',
          }
    });

export async function getServerSideProps(context) {
    let detailsResult = await fetch(`https://api.tvtalk.app/shows/${context.query.tmsId}`)
    let photosResults = await fetch(`https://data.tmsapi.com/v1.1/programs/${context.query.tmsId}/images?imageSize=Md&api_key=v5nfdpmz66hp2nd5t9gefcrc`)

    let details = await detailsResult.json()
    let photos = await photosResults.json()
    return {
        props: {
            details: details,
            photos: photos
        }, // will be passed to the page component as props
    }
}

const about = ({ details, photos }) => {

    const { 
        preferred_image_uri,
        title, longDescription,
        releaseYear,
        genres,
        rating_percentage_cache } = details;
    let image = preferred_image_uri.match(/(^.*)?\?/)[1]
    const handleSeasonChange = () => {
       
    }

    const handleEpisodeChange = () => {

    }

    return (
        <Box className="about">
            <StyledHeader 
                className="about__header"
                style={{ background: `url(${image})` }}
            >
                <BackButton
                    title='Back'
                    />

                <Box
                    sx={{ 
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }} 
                >
                    <Typography 
                        sx={{ color: '#EFF2FD', zIndex: 1, fontWeight: 700, textAlign: 'center' }} 
                        variant='h1'>
                        {title}
                    </Typography>
                    <Typography 
                        sx={{ color: '#454F75', zIndex: 1, fontSize: '20px', marginBottom: '32px' }} 
                        variant='h1'>
                            {`${releaseYear}/${genres.join('-')}`}
                    </Typography>
                </Box>

            </StyledHeader>
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
                <StyledDescriprion sx={{  zIndex: 1, textAlign: 'center' }}>
                    <Typography 
                        sx={{ color: '#A5B0D6', fontSize: '16px', lineHeight: '29px' }}
                        variant='string'>
                            {longDescription}
                    </Typography>
                </StyledDescriprion>
                <Box sx={{ display: 'flex', gap: '20px', marginTop: '36px' }}>
                    <BlueButton 
                        title='Chat'
                    />
                    <HeartButton />
                </Box>
            </StyledDetailsBox>
            <StyledBottomBox>
                <RatingButtonsGroup
                    love={rating_percentage_cache.love}
                    like={rating_percentage_cache.like}
                    dislike={rating_percentage_cache.dislike}
                 />
                <CastSlider
                  cast={details.cast}
                />
                <SeriesPhotoSlider
                    photos={photos}
                />
            </StyledBottomBox>
        </Box>
    );
};

export default about;