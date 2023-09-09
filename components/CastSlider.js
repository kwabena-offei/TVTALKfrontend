import React from 'react';
import { Box, Typography } from '@mui/material';
import ActorCard from '../components/ActorCard';
import Carousel from 'react-elastic-carousel';
import { useWindowDimensions } from '../util/useWindowDimensions.js';

const CastSlider = ({ cast }) => {

  const { isMobile } = useWindowDimensions();
  return (
    <Box
      sx={{ marginTop: '60px', position: 'relative', paddingLeft: 0, marginLeft: 0, marginBottom: '60px' }}
    >
      <Typography sx={{
        fontSize: '36px',
        lineHeight: '47px',
        color: '#EFF2FD',
        fontWeight: '600',
        marginBottom: '16px'
      }}>
        {'Cast'}
      </Typography>
      <Carousel
        itemsToShow={isMobile ? 2 : 6}
        itemsToScroll={2}
        pagination={false}
        itemPadding={[0, 15]}
        showArrows={false}
        style={{ marginLeft: -25, paddingLeft: 0 }}

      >
        {cast.map((actor, index) => (
          <ActorCard
            key={index}
            name={actor.name}
            imageUrl={actor.imageUrl}
            characterName={actor.characterName}
          />
        ))}
      </Carousel>
    </Box>
  );
};

export default CastSlider;