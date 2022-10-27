import React from 'react';
import { Box, Typography } from '@mui/material';



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
    console.log(details)
    const { preferred_image_uri, title, longDescription, releaseYear, genres } = details;
    let image = preferred_image_uri.match(/(^.*)?\?/)[1]
    const handleChange = () => {

    }

    return (
        <Box className="about">
            <Box 
                className="about__header"
                style={{ background: `url(${image})` }}
                sx={{height: '960px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <Typography 
                    sx={{ color: '#EFF2FD', zIndex: 1 }} 
                    variant='h1'>
                        {title}
                    </Typography>
                <Typography 
                    sx={{ color: '#454F75', zIndex: 1, fontSize: '20px' }} 
                    variant='h1'>
                        {`${releaseYear}/${genres.join('-')}`}
                </Typography>
     
                <Box sx={{ width: '700px', zIndex: 1, textAlign: 'center' }}>
                    <Typography 
                        sx={{ color: '#A5B0D6', fontSize: '16px', lineHeight: '29px' }}
                        variant='string'>
                            {longDescription}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default about;