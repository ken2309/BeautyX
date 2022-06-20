import React from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import img from "../../../constants/img";
import HomePromo from "../../Homev2/components/HomePromo";
import HomeTitleSection from "../../Homev2/components/HomeTitleSection/index";
import "./homeHotDeal.css";
export default function HomeHotDeal() {
    const history = useHistory();

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
        <div className="home-hot-deal">
            <div className="flex-row-sp home-se-promo__header">
                <HomeTitleSection title={`Top Deal Khủng`} />
                <div onClick={() => history.push("/deal-lam-dep-cuc-HOT")}>
                    <div className="flex-row cursor-pointer">
                        <p
                            style={{
                                fontSize: "16px",
                                color: "var(--purple)",
                                fontWeight: "bold",
                            }}
                        >
                            Xem thêm {">"}
                        </p>
                    </div>
                </div>
            </div>
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
