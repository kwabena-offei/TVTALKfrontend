
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Card } from '@mui/material';
import BackButton from '../../../components/BackButton';
import Head from 'next/head';
import useAxios from "../../../services/api";
import { useRouter } from 'next/router';
import Masonry from '@mui/lab/Masonry';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from '@mui/material/Container';

export async function getStaticProps({ params }) {
  const { tmsId } = params;

  const detailsUrl = `https://api.tvtalk.app/data/v1.1/programs/${tmsId}`;

  const [detailsResponse, photosResponse] = await Promise.all([
    fetch(detailsUrl),
  ]);

  let details;
  let photos = [];

  try {
    details = await detailsResponse.json();
  } catch (error) {
    console.error("Error parsing details response:", error);
  }


  if (!details) {
    const otherDetailsUrl = `https://api.tvtalk.app/data/v1.1/programs/${tmsId}`;
    const otherDetailsResponse = await fetch(otherDetailsUrl);
    details = await otherDetailsResponse.json();
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




  return {
    props: {
      details,
      photos
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



const Cast = ({ details }) => {
  console.log({ details })
  const cast = details.cast;
  const { axios } = useAxios();
  const router = useRouter();
  const [ratingCache, setRatingCache] = useState(details.rating_percentage_cache || {});
  const [userRating, setUserRating] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const {
    preferred_image_uri,
    title,
    longDescription,
    releaseYear,
    genres,
    tmsId,
    totalSeasons
  } = details;
  console.log({ cast })
  const defaultPhoto = cast ? `https://${cast[0].src}` : null;

  return (
    <>
      <Head>
        <title>{title} Cast | TV Talk</title>
        <meta property="og:title" content={`About ${title} | TV Talk`} />
        <meta property="og:description" content={`${title} Cast at TV Talk`} />
        <meta property="og:image" content={defaultPhoto} />
      </Head>

      <Container maxWidth="xl">
        <Box sx={{ position: 'relative' }} >
          <div style={{ width: '100%', margin: '0 auto', position: 'relative' }}>
            <BackButton
              title='Back'
            />

          </div>
        </Box>

        <Typography sx={{
          fontSize: '48px',
          lineHeight: '47px',
          color: '#EFF2FD',
          fontWeight: '600',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          {'Cast'}
        </Typography>

        <Masonry
          columns={isMd ? 1 : 2}
          spacing={isMobile ? 2.5 : 3.5}
          defaultColumns={1}
          defaultSpacing={2.5}
          sx={{ margin: 0 }}
        >
          {cast?.map((cast) => (
            <Card style={{ height: 260, display: 'flex' }}>
              <img
                src={cast.imageUrl}
                alt={`${cast.name}`}
                height={260}
              />
              <div style={{ padding: isMobile ? 15 : 30 }}>
                <Typography sx={{
                  fontSize: isMobile ? '16px' : '32px',
                  lineHeight: '1.5em',
                  color: '#EFF2FD',
                  fontWeight: '500',
                }}>
                  {cast.name}
                </Typography>
                <Typography sx={{
                  fontSize: isMobile ? '14px' : '16px',
                  lineHeight: '1.2em',
                  color: '#636D92',
                  fontWeight: '400',
                }}>
                  ({cast.characterName})
                </Typography>
              </div>
            </Card>
          ))}

        </Masonry>
      </Container >
    </>
  );
};

export default Cast;
