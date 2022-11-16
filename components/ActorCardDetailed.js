import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography, CardMedia } from '@mui/material';


const StyledWrapper = styled(Box, {})
    ({
        width: '750px',
        height: '261px',
        background: '#131B3F',
        display: 'flex',
        borderRadius: '6px',
        ['@media (max-width:780px)'] : {
            width: '335px',
            height: '181px',
          }
    });

const StyledPhoto = styled(CardMedia, {})
({
    height: "261px",
    width: "230px",
    borderRadius: '6px 0px 0px 6px',
    ['@media (max-width:780px)'] : {
        width: '96px',
        height: '110px',
        marginLeft: '10px',
        marginTop: '10px',
        borderRadius: '6px',
    }
});

const StyledInfoWrapper = styled(Box, {})
({
    marginTop: '14px',
    marginLeft: '30px',
    ['@media (max-width:780px)'] : {
        marginTop: '10px',
        marginLeft: '10px',
    }
});

const StyledName = styled(Typography, {})
({
    fontSize: '32px',
    lineHeight: '38px',
    color: '#EFF2FD',
    ['@media (max-width:780px)'] : {
        fontSize: '16px',
        lineHeight: '19px',
    }
});


const StyledCharacter = styled(Typography, {})
({
    fontSize: '16px',
    lineHeight: '19px',
    color: '#636D92',
    marginTop: '5px',
    ['@media (max-width:780px)'] : {
        fontSize: '14px',
        lineHeight: '17px',
    }
});

const StyledSecondaryText = styled(Typography, {})
({
    fontSize: '16px',
    lineHeight: '21px',
    color: '#A5B0D6',
    ['@media (max-width:780px)'] : {
        fontSize: '12px',
        lineHeight: '15px',
    }
});


const ActorCardDetailed = ({ name, characterName, gender, birth, photo }) => {
    return (
        <StyledWrapper>
            <StyledPhoto
                component="img"
                src="/assets/actor.png"
                alt='Actors photo'
            />   
            <StyledInfoWrapper>
                <StyledName sx={{ 
                    fontSize: '32px',
                    lineHeight: '38px',
                    color: '#EFF2FD',
                }}>
                    {name}
                </StyledName>
                <StyledCharacter sx={{ 
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#636D92',
                    marginTop: '5px'
                }}>
                    {`(${characterName})`}
                </StyledCharacter>
                <Box
                    sx={{ display: 'flex', marginTop: '20px' }}
                >
                    <StyledSecondaryText sx={{ fontWeight: '600', marginRight: '3px' }}>
                        {'Gender:'}
                    </StyledSecondaryText>
                    <StyledSecondaryText>
                        {gender}
                    </StyledSecondaryText>
                </Box>
                <Box
                    sx={{ display: 'flex', marginTop: '6px' }}
                >
                    <StyledSecondaryText sx={{ fontWeight: '600', marginRight: '3px' }}>
                        {'Birth:'}
                    </StyledSecondaryText>
                    <StyledSecondaryText>
                        {birth}
                    </StyledSecondaryText>
                </Box>
            </StyledInfoWrapper>
        </StyledWrapper>
    );
};

export default ActorCardDetailed;