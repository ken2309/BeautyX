import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppProvider";
//import HomeFilter from "./HomeFilter";
import Slider from "react-slick";
import bannerApi from "../../../api/bannerApi";
import { useHistory } from "react-router-dom";
import { IBanner } from "../../../interface/banner";
import HomeBannerPopup from "./HomeBannerPopup";
import ReactPlayer from "react-player";
import { banner_default } from "../../../constants/img";

// const styleFilter = {
//   position: "absolute",
//   width: "66.66%",
//   boxShadow: "0px 6px 37px rgba(113, 97, 186, 0.1)",
//   padding: "36px",
// };
function HomeBanner(props: any) {
  const history = useHistory();
  const [chooseBanner, setChooseBanner] = useState<IBanner>();
  const [banners, setBanners] = useState([]);
  const [open, setOpen] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  function openWeb() {
    const payUrl = chooseBanner?.url;
    window.open(`${payUrl}`, "_blank", "noopener,noreferrer");
  }
  function closePopupVideo() {
    setOpenVideo(false);
  }
  const { t } = useContext(AppContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    //autoplay: true,
    //swipe: true,
    autoplaySpeed: 3500,
    fade: true,
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
      <div>
        <ul>{dots}</ul>
      </div>
    ),
    afterChange: function (index: number) {
      setChooseBanner(banners[index - 1]);
    },
  };
  const bannerImg = [
    {
      url: banner_default,
    },
  ];
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
          //return console.log(chooseBanner)
          return history.push({
            pathname: `/org/${chooseBanner.name}`,
            search: `${chooseBanner.origin_id}`
          });
        default:
          break;
      }
    }
  };
  useEffect(() => {
    async function getBanners() {
      try {
        const res = await bannerApi.getAll();
        setBanners(res.data.context.data);
      } catch (error) {
        console.log(error);
      }
    }
    getBanners();
  }, []);
  return (
    <div className="home-banner">
      <Slider {...settings}>
        {bannerImg.map((item: any, index: number) => (
          <div key={index + item.url} className="home-banner__img">
            <img src={item.url} alt="" />
          </div>
        ))}
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
      <HomeBannerPopup data={chooseBanner} open={open} setOpen={setOpen} />

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

      <span className="home-banner__slogan">{t("Banner.1")}</span>
      {/* <HomeFilter styleFilter={styleFilter} /> */}
    </div>
  );
}

export default HomeBanner;
