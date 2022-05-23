import React from "react";
import img from "../../../constants/img";
// import { AppContext } from "../../../context/AppProvider";
// import SectionTitle from "../../SectionTitle";
import "./slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function HomeSlider(props: any) {
  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          autoplay: true,
          fade: true,
          speed: 250,
        },
      },
    ],
    appendDots: (dots: any) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
  };
  return (
    <div className="home-slider">
      <Slider {...settings}>
        <div className="home-slider__img">
          <img src={img.thumb} alt="" />
        </div>
        <div className="home-slider__img">
          <img src={img.thumb_1} alt="" />
        </div>
        <div className="home-slider__img">
          <img src={img.thumb_2} alt="" />
        </div>
        <div className="home-slider__img">
          <img src={img.thumb} alt="" />
        </div>
      </Slider>
    </div>
  );
}

export default HomeSlider;
