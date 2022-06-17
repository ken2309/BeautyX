import { Container } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import icon from "../../../constants/icon";
import { dealHot } from "../../../constants/img";
import { IBanner } from "../../../interface/banner";
import "./homeBanner.css";

const PrevButton = (props: any) => {
    const { onClick } = props;
    return (
        <button onClick={onClick} className="homepage-btn__prev">
            <img src={icon.chevronRight} alt="" />
        </button>
    );
};
const NextButton = (props: any) => {
    const { onClick } = props;
    return (
        <button onClick={onClick} className="homepage-btn__next">
            <img src={icon.chevronRight} alt="" />
        </button>
    );
};

export default function HomeBanner() {
    const [chooseBanner, setChooseBanner] = useState<IBanner>();
    const HOME = useSelector((state: any) => state.HOME);
    const { banners } = HOME;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        //autoplay: true,
        nextArrow: <NextButton />,
        prevArrow: <PrevButton />,
        swipe: true,
        autoplaySpeed: 2000,
        //fade: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    swipe: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    swipe: true,
                    dots: true,
                    speed: 100,
                },
            },
        ],
        appendDots: (dots: any) => (
            <div className="banner-dot">
                <ul>{dots}</ul>
            </div>
        ),
        afterChange: function (index: number) {
            setChooseBanner(banners[index]);
        },
    };
    return (
        <div className="homepage-banner">
            <Container>
                <div className="banner-wraper">
                    <div className="banner-slide">
                        <Slider {...settings}>
                            {banners.map((item: any, index: number) => (
                                <div
                                    // onClick={handleClick}
                                    key={index + item.url}
                                    className="banner-slide__img"
                                >
                                    <img src={item.imageURL} alt="" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="banner-right">
                        <div className="banner-right__top">
                            <img src={dealHot.dealhot} alt="" />
                        </div>
                        <div className="banner-right__bottom">
                            <div className="banner-bottom__item">
                                <img src={dealHot.dealhot1} alt="" />
                            </div>
                            <div className="banner-bottom__item">
                                <img src={dealHot.dealhot2} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
