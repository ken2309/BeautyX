import React, { useState } from "react";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import { IBanner } from "../../../interface/banner";
import HomeBannerPopup from "./HomeBannerPopup";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import icon from "../../../constants/icon";

function HomeBanner(props: any) {
    const history = useHistory();
    const HOME = useSelector((state: any) => state.HOME);
    const { banners } = HOME;
    const [chooseBanner, setChooseBanner] = useState<IBanner>();
    const [open, setOpen] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    function openWeb() {
        const payUrl = chooseBanner?.url;
        window.open(`${payUrl}`, "_blank", "noopener,noreferrer");
    }
    function closePopupVideo() {
        setOpenVideo(false);
    }
    //const { t } = useContext(AppContext);
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
    // const bannerImg = [
    //   {
    //     url: banner_default,
    //   },
    // ];
    const handleClick = () => {
        if (chooseBanner) {
            switch (chooseBanner.type) {
                case "VIDEO":
                    return setOpenVideo(true);
                case "HTML":
                    return setOpen(true);
                case "WEB":
                    return openWeb();
                case "PROMOTION":
                    return console.log("PROMOTION");
                case "ORGANIZATION":
                    return history.push({
                        pathname: `/org/${chooseBanner.origin_id}`,
                    });
                default:
                    break;
            }
        }
    };
    return (
        <div className="home-banner">
            <Slider {...settings}>
                {/* {bannerImg.map((item: any, index: number) => (
          <div key={index + item.url} className="home-banner__img">
            <img src={item.url} alt="" />
          </div>
        ))} */}
                {banners.map((item: any, index: number) => (
                    <div
                        onClick={handleClick}
                        key={index + item.url}
                        className="home-banner__img"
                    >
                        <img src={item.imageURL} alt="" />
                    </div>
                ))}
            </Slider>
            <HomeBannerPopup
                data={chooseBanner}
                open={open}
                setOpen={setOpen}
            />

            {openVideo === true ? (
                <div className="homebanner__popup-videobox">
                    <div className="homebanner__popup-video">
                        <span className="close-icon" onClick={closePopupVideo}>
                            x
                        </span>
                        <div className="banner-video">
                            <ReactPlayer
                                controls
                                width={"100%"}
                                height={"100%"}
                                url={`${chooseBanner?.url}`}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}

            {/* <span className="home-banner__slogan">{t("Banner.1")}</span> */}
            {/* <HomeFilter styleFilter={styleFilter} /> */}
        </div>
    );
}

export default HomeBanner;

const PrevButton = (props: any) => {
    const { onClick } = props;
    return (
        <button onClick={onClick} className="home-banner__btn-prev">
            <img src={icon.chevronLeft} alt="" />
        </button>
    );
};
const NextButton = (props: any) => {
    const { onClick } = props;
    return (
        <button onClick={onClick} className="home-banner__btn-next">
            <img src={icon.chevronRight} alt="" />
        </button>
    );
};
