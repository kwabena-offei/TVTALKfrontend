import React from 'react';
import { useRouter } from 'next/router'
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';



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
    console.log(photos)
    const { preferred_image_uri, title, longDescription } = details;
    let image = preferred_image_uri.match(/(^.*)?\?/)[1]
    const handleChange = () => {

    }

    return (
        <Box className="about">
            <Box className="about__header" style={{ background: `url(${image})` }}>
                <Typography style={{ color: 'white', zIndex: 1 }} variant='h1'>{title}</Typography>
                
                {/* <FormControl style={{zIndex: 1}}>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        style={{background: 'white'}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl> */}
                <Box sx={{ width: '700px', zIndex: 1 }}>
                    <Typography style={{ color: 'white' }} variant='string'>{longDescription}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default about;