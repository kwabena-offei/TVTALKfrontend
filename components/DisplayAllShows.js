import React from 'react';
import { Typography, Box } from '@mui/material';
import { CustomCarousel } from './HomePage/HomePage.styled';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery"; import { useRouter } from 'next/router'

import CustomShowCard from './HomePage/CustomShowCard';

const DisplayAllShows = ({ shows }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter()

    const convertToSlug = (name) => {
        let slug = ''
        slug = name.replace('%20', '-').toLowerCase()
        return slug
    }

    // Pushes tmsID to the about page
    const handleAbout = (tmsId, title) => {

        router.push({ pathname: '/about', query: { tmsId: tmsId } })
    }

    return (
        <>

            {/* <Box style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 4 }}>
                    <Typography sx={{ color: 'white' }}>Let's start a community of TV fans </Typography>
                    <Typography sx={{ color: 'white' }}>Press "Chat" and post a message!</Typography>
                </Box>
                <Box style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: 'rgba(9, 15, 39, 0.32)', }} />
                <img src='/assets/header.jpg' width='100%' />
            </Box> */}
            {/* className='wrapper' */}
            <div style={{ width: '1500px', margin: '0 auto', padding: '0 1rem' }}>
                {shows.map((show, index) =>
                    <Box key={index} sx={{ margin: '100px 0' }}>

                        <Typography sx={{ color: 'white' }}>{show.title}</Typography>
                        <CustomCarousel isMobile={isMobile}>

                            {show.shows.map((tvShow, ind) =>
                                <CustomShowCard tvShow={tvShow} ind={ind} />
                            )}
                        </CustomCarousel>
                    </Box>
                )}
            </div>
        </>


    );
};

export default DisplayAllShows;