import { useState } from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Grid, Typography } from '@mui/material';
import HeartButton from '../components/HeartButton';
import BlueButton from '../components/BlueButton';
import Link from 'next/link';
import { styled } from '@mui/system';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Live({ tvShows = [] }) {
  const [expanded, setExpanded] = useState(false);

  const collapsedCount = 4;
  const displayedShows = expanded ? tvShows : tvShows.slice(0, collapsedCount);

  const Container = styled('div')(({ expanded }) => ({
    gap: '30px',
    overflowX: expanded ? 'hidden' : 'auto',
    overflowY: 'hidden',
    flexWrap: expanded ? 'wrap' : 'nowrap',
    display: 'flex',
    WebkitOverflowScrolling: 'touch',
    flexGrow: 1,
    scrollSnapType: 'both mandatory',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    msOverflowStyle: 'none',
    '& > div': {
      scrollSnapAlign: 'start',
    },
    '@media (min-width: 900px)': {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      overflowX: 'initial',
      maxHeight: expanded ? 'auto' : 'auto',
      overflow: 'hidden',
    },
  }));

  const Item = styled('div')(({ expanded }) => ({
    flex: '0 0 calc(80% - 30px)',
    ...(expanded && {
      flex: '0 0 100%',
    }),
    '@media (min-width: 900px)': {
      flex: 'initial',
    },
  }));

  const StyledTypography = styled(Typography)({
    color: '#EFF2FD',
    fontFamily: 'Gilroy',
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: '130%',
    letterSpacing: '0.4px',
    scrollSnapAlign: 'start',
    marginBottom: '25px',
    '@media (max-width: 600px)': {
      fontSize: '20px',
      marginBottom: '15px',
    },
  });


  if (tvShows.length === 0) {
    return (
      <div style={{ marginBottom: '80px' }}>
        <StyledTypography>
          Live
        </StyledTypography>
        <div style={{ color: '#EFF2FD', textAlign: 'center', padding: '20px' }}>
          No live shows available at the moment.
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <StyledTypography>
          Live
        </StyledTypography>

        {expanded ? <Button endIcon={<ExpandLessIcon />} style={{ color: '#FFF' }} variant='outlined' onClick={() => { setExpanded(false) }}>Close All</Button> : <Button style={{ color: '#FFF' }} endIcon={<ExpandMoreIcon />} variant='outlined' onClick={() => { setExpanded(true) }}>View All</Button>}
      </div>

      <Container expanded={expanded}>
        {displayedShows.map((tvShow, index) => (
          <Item key={index} expanded={expanded}>
            <Card key={`${tvShow.tmsId}`} sx={{ background: 'transparent' }}>
              <Image
                src={tvShow.preferred_image_uri?.startsWith('http') 
                  ? tvShow.preferred_image_uri 
                  : tvShow.preferred_image_uri?.startsWith('/')
                    ? tvShow.preferred_image_uri
                    : tvShow.preferred_image_uri
                      ? `https://${tvShow.preferred_image_uri}`
                      : '/assets/live.jpg'
                }
                alt={`${tvShow.title || 'TV Show'} Image`}
                width={720}
                height={540}
                layout="responsive"
                quality={75}
                loading='eager'
              />
              <CardContent sx={{ background: '#131B3F' }}>
                <Typography gutterBottom variant="h5" component="div" >
                  <h1 style={{ color: '#EFF2FD', fontSize: 25, fontWeight: 500, margin: '0' }}>{tvShow.title || 'Loading...'}</h1>
                  <span style={{ fontSize: '14px', paddingRight: '16px' }}>Network: {tvShow.networks && tvShow.networks.length > 0 ? tvShow.networks[0].name : 'N/A'}</span>
                  <span style={{ fontSize: '14px', paddingRight: '16px' }}>Channel: {tvShow.channel || 'N/A'}</span>
                  <p style={{ fontSize: '14px', margin: '0' }}> Airtime: {tvShow.airtime || 'N/A'} </p>
                </Typography>
                <Grid container spacing={1}>
                  <Grid item>
                    <Link href={`/chat/${tvShow.tmsId}`} passHref>
                      <BlueButton
                        title='Chat'
                      />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href={`/programs/${tvShow.tmsId}/about`} passHref>
                      <Button style={{ background: '#090F27', borderRadius: '10000px', boxShadow: 'none' }} variant='contained'>
                        <Typography sx={{ color: '#919CC0' }} variant='string'>About</Typography>
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <HeartButton identifier={{ tmsId: tvShow.tmsId }} itemId={tvShow.tmsId} itemType={'shows'} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Item>
        ))}
      </Container>
    </div>
  );
}

export default Live;
