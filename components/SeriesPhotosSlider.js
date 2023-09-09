import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import Carousel from 'react-elastic-carousel';
import { useWindowDimensions } from '../util/useWindowDimensions.js';
import ViewAllButton from '../components/ViewAllButton';
import FullsizeModal from '../components/FullsizeModal';

const SeriesPhotoSlider = ({ photos }) => {

  const { isMobile } = useWindowDimensions();

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <Box
      sx={{ marginTop: '60px', position: 'relative' }}
    >
      <ViewAllButton
        onClick={handleOpen}
      />
      <Typography sx={{
        fontSize: '36px',
        lineHeight: '47px',
        color: '#EFF2FD',
        fontWeight: '600',
        marginBottom: '16px'
      }}>
        {'Photos'}
      </Typography>
      <Carousel
        itemsToShow={isMobile ? 2 : 5}
        itemsToScroll={2}
        pagination={false}
        itemPadding={[0, 10]}
        showArrows={!isMobile}
      >
        {photos?.map((photo, index) => (
          <CardMedia
            key={index}
            src={`https://${photo.uri}`}
            component="img"
            alt='Series photo'
            sx={{ borderRadius: '6px', height: '260px', width: `${photo.width}px` }}
          />
        ))}
      </Carousel>
      <FullsizeModal
        isOpen={modalOpen}
        onClose={handleClose}
        title='Photos'
      >
        <div>Photos</div>
      </FullsizeModal>
    </Box>
  );
};

export default SeriesPhotoSlider;