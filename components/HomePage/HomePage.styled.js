import React from "react";

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/system";
import styled from "styled-components";
import { Typography } from "@mui/material";

const CustomTitle = () => {
    return <Typography></Typography>
}
const CustomNextButton = styled(Box, {
    name: "Favorite",
    slot: "dark-button"
})({
    '&::before': {
        content: '',
        color: '#A5B0D6',
        fontSize: '3rem',
    },
    boxShadow: 'none'
})



const NextArrow = ({ ...props }) => {
    return (
        <CustomNextButton
            {...props}
        />
    );
}

const CustomPrevButton = styled(Box, {
    name: "Favorite",
    slot: "dark-button"
})({
    '&::before': {
        content: '',
        color: '#A5B0D6',
        fontSize: '3rem',
    },
    left: '-50px',
    boxShadow: 'none'
})

const PrevArrow = ({ ...props }) => {
    return (
        <CustomPrevButton {...props} />
    );
}


export const CustomCarousel = ({ children, isMobile, ...props }) => {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            {children}
        </Slider>

    );
};