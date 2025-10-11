import React, { useState } from 'react';
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
import dayjs from 'dayjs';
import ShowImage from '../components/ShowImage';

// ---------- helpers ----------
const formatAirTime = (isoString) => {
  if (!isoString) return 'N/A';
  try {
    const date = new Date(isoString);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (isToday) return `Today, ${timeStr}`;
    if (isTomorrow) return `Tomorrow, ${timeStr}`;
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + `, ${timeStr}`;
  } catch (e) {
    console.error('Error formatting date:', e);
    return isoString;
  }
};

// --------------------------------

function UpcomingCard({
  tvShows = [],
  // Set how far ahead to show (in hours). Front-end filter only.
  windowHours = 6,
  collapsedCount = 4,
}) {
  const [expanded, setExpanded] = useState(false);

  // Apply front-end time window filter if needed
  const filteredShows = React.useMemo(() => {
    if (!tvShows.length) return [];
    
    const now = dayjs();
    const until = now.add(windowHours, 'hours');
    const filtered = tvShows.filter(s => {
      const airtime = dayjs(s.rawAirtime);
      return airtime.isAfter(now) && airtime.isBefore(until);
    });

    return filtered.length ? filtered : tvShows; // fallback to all if filter empties it
  }, [tvShows, windowHours]);

  const displayedShows = expanded ? filteredShows : filteredShows.slice(0, collapsedCount);

  const Container = styled('div')(({ expanded }) => ({
    gap: '30px',
    overflowX: expanded ? 'hidden' : 'auto',
    overflowY: 'hidden',
    flexWrap: expanded ? 'wrap' : 'nowrap',
    display: 'flex',
    WebkitOverflowScrolling: 'touch',
    flexGrow: 1,
    scrollSnapType: 'both mandatory',
    '&::-webkit-scrollbar': { display: 'none' },
    msOverflowStyle: 'none',
    '& > div': { scrollSnapAlign: 'start' },
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
    ...(expanded && { flex: '0 0 100%' }),
    '@media (min-width: 900px)': { flex: 'initial' },
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

  if (filteredShows.length === 0) {
    return (
      <div style={{ marginBottom: '80px' }}>
        <StyledTypography>Upcoming</StyledTypography>
        <div style={{ color: '#EFF2FD', textAlign: 'center', padding: '20px' }}>
          No upcoming shows available.
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <StyledTypography>Upcoming</StyledTypography>
        {expanded ? (
          <Button endIcon={<ExpandLessIcon />} style={{ color: '#FFF' }} variant='outlined' onClick={() => setExpanded(false)}>
            Close All
          </Button>
        ) : (
          <Button endIcon={<ExpandMoreIcon />} style={{ color: '#FFF' }} variant='outlined' onClick={() => setExpanded(true)}>
            View All
          </Button>
        )}
      </div>

      <Container expanded={expanded}>
        {displayedShows.map((tvShow, index) => (
          <Item key={`${tvShow.tmsId}-${index}`} expanded={expanded}>
            <Card sx={{ background: 'transparent' }}>
              <ShowImage
                src={tvShow.preferred_image_uri}
                title={tvShow.title}
                quality={75}
                loading='eager'
              />
              <CardContent sx={{ background: '#131B3F' }}>
                <Typography gutterBottom variant="h5" component="div">
                  <h1 style={{ color: '#EFF2FD', fontSize: 25, fontWeight: 500, margin: 0 }}>
                    {tvShow.title || 'Loading...'}
                  </h1>
                  <span style={{ fontSize: '14px', paddingRight: '16px' }}>
                    Network: {tvShow.networks?.[0]?.name || 'N/A'}
                  </span>
                  <span style={{ fontSize: '14px', paddingRight: '16px' }}>
                    Channel: {tvShow.channel || 'N/A'}
                  </span>
                  <p style={{ fontSize: '14px', margin: 0 }}>Airtime: {tvShow.airtime || 'N/A'}</p>
                </Typography>
                <Grid container spacing={1}>
                  <Grid item>
                    <Link href={`/chat/${tvShow.tmsId}`} passHref>
                      <BlueButton title='Chat' />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href={`/programs/${tvShow.tmsId}/about`} passHref>
                      <Button style={{ background: '#090F27', borderRadius: 10000, boxShadow: 'none' }} variant='contained'>
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

export default UpcomingCard;
