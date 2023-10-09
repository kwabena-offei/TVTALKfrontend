import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import Carousel from 'react-elastic-carousel';
import { useWindowDimensions } from '../util/useWindowDimensions.js';
import ViewAllButton from '../components/ViewAllButton';
import Link from 'next/link';

const SeriesPhotoSlider = ({ photos, tmsId }) => {

  const { isMobile } = useWindowDimensions();

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <Box
      sx={{ marginTop: '60px', position: 'relative', paddingLeft: 0, marginLeft: 0, marginBottom: '60px' }}
    >
      <Link href={`/programs/${tmsId}/photos`} passHref>
        <ViewAllButton />
      </Link>
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
        itemsToShow={isMobile ? 1.4 : 5}
        itemsToScroll={2}
        pagination={false}
        itemPadding={[0, 15]}
        showArrows={false}
        style={{ marginLeft: -25, paddingLeft: 0 }}
      >
        {photos?.map((photo, index) => (
          <CardMedia
            key={index}
            src={`https://${photo.uri}`}
            component="img"
            alt='Series photo'
          />
        ))}
      </Carousel>
    </Box>
  );
};

export default SeriesPhotoSlider;