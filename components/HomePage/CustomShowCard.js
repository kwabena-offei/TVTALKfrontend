import { Button, Card, CardContent, CardMedia, Grid, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTheme } from 'styled-components';
import BlueButton from '../BlueButton';
import HeartButton from '../HeartButton';

const CustomShowCard = ({ tvShow, ind }) => {

    return (
        <Box sx={{ padding: '0 1rem' }}>
            <Card key={`custom-card-${ind}`} sx={{ background: 'transparent', minWidth: '100%', }}>
                <CardMedia
                    component="img"
                    sx={{ minHeight: '15rem' }}
                    image={tvShow.preferred_image_uri}

                />
                <CardContent sx={{ background: '#131B3F' }}>
                    <Typography sx={{ color: '#EFF2FD' }} gutterBottom variant="h5" component="div">
                        {tvShow.title}
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item>
                            <BlueButton
                                title='Chat'
                            />
                        </Grid>
                        <Grid item>
                            <Button onClick={() => handleAbout(tvShow.tmsId)} sx={{ background: '#090F27', borderRadius: '10000px', boxShadow: 'none' }} variant='contained'>
                                <Typography sx={{ color: '#919CC0' }} variant='string'>About</Typography>
                            </Button>
                        </Grid>
                        <Grid item>
                            <HeartButton />
                        </Grid>
                    </Grid>
                </CardContent>

            </Card>
        </Box>

    );
};

CustomShowCard.propTypes = {

};

export default CustomShowCard;