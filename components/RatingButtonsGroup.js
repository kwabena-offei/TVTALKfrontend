import React from 'react';
import { Typography, Box } from '@mui/material';
import RatingButton from './RatingButton';
import HeartsSmile from './HeartsSmile';
import StarSmile from './StarSmile';
import RollingEyesSmile from './RollingEyesSmile';
import { styled } from '@mui/system';

const StyledTitle = styled(Typography)
  ({
    color: '#EFF2FD',
    fontSize: '36px',
    marginRight: '30px',
    ['@media (max-width:780px)']: {
      fontSize: '20px',
      lineHeight: '28px',
    }
  });

const StyledButtonsWrapper = styled(Box)
  ({
    ['@media (max-width:780px)']: {
      display: 'flex',
    }
  });

const RatingButtonsGroup = ({ love, like, dislike, tmsId, onRate, userRating }) => {

  return (
    <Box
      sx={{ marginTop: '60px' }}
    >
      <StyledTitle
        variant='string'>
        <Typography sx={{
          fontSize: '36px',
          lineHeight: '47px',
          color: '#EFF2FD',
          fontWeight: '600',
          marginBottom: '16px'
        }}>
          {'Ratings'}
        </Typography>
      </StyledTitle>

      <StyledButtonsWrapper>
        <RatingButton
          icon={<HeartsSmile />}
          title='Love it'
          rating={love ? `${love}%` : ''}
          checked={userRating === 'love'}
          onClick={onRate.bind(this, 'love')}
        />
        <RatingButton
          icon={<StarSmile />}
          title='Like it'
          rating={like ? `${like}%` : ''}
          checked={userRating === 'like'}
          onClick={onRate.bind(this, 'like')}
        />
        <RatingButton
          icon={<RollingEyesSmile />}
          title='Leave it'
          rating={dislike ? `${dislike}%` : ''}
          checked={userRating === 'dislike'}
          onClick={onRate.bind(this, 'dislike')}
        />
      </StyledButtonsWrapper>
    </Box>
  );
};

export default RatingButtonsGroup;