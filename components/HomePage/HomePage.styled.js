import React from "react";

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/system";
import styled from "styled-components";

const CustomTitle = () => {
    return
}
const CustomButton = styled(Box, {
    name: "Favorite",
    slot: "dark-button"
})({
    '&:before': 'red',
    backgroundColor: '#090F27',
    // color: "#A5B0D6",
    // paddingLeft: '1.15vw',
    // paddingRight: '1.15vw',
    boxShadow: 'none'
})



const NextArrow = ({ ...props }) => {
    return (
        <CustomButton
            {...props}
        />
    );
}

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
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