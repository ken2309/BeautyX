import React from "react";
import Slider from "react-slick";
import img from "../../../constants/img";
import HomeTitle from "../Components/HomeTitle";
import HomePromo from "../HomePromo";
import "./homeHotDeal.css";
export default function HomeHotDeal() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        //    nextArrow: <NextButton />,
        //    prevArrow: <PrevButton />,
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
        // afterChange: function (index: number) {
        //     setChooseBanner(banners[index]);
        // },
    };
    return (
        <div className="home-hot__deal">
            <HomeTitle title={`Top Deal Khủng`} url={"/deal-lam-dep-cuc-HOT"} />
            <ul className="dealHot-listBanner">
                <Slider {...settings}>
                    <li className="dealHot-listBanner__item">
                        <img src={img.banner} alt="" />
                    </li>
                    <li className="dealHot-listBanner__item">
                        <img
                            src={"https://source.unsplash.com/random"}
                            alt=""
                        />
                    </li>
                    <li className="dealHot-listBanner__item">
                        <img src={img.banner} alt="" />
                    </li>
                    <li className="dealHot-listBanner__item">
                        <img
                            src={"https://source.unsplash.com/random"}
                            alt=""
                        />
                    </li>
                </Slider>
            </ul>

            <HomePromo />
        </div>
    );
}
