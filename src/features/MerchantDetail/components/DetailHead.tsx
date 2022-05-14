import React, { useRef, useState, useContext, useEffect } from "react";
import { Container } from "@mui/material";
import icon from "../../../constants/icon";
import { AppContext } from "../../../context/AppProvider";
import img from "../../../constants/img";
import OrgCardLoading from "../../Loading/OrgCardLoading";
import PopupDetailContact from "./PopupDetailContact";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import DetailHeadOpenTime from "../components/DetailHeadOpenTime";
import { useHistory } from 'react-router-dom'
import favorites from "../../../api/favorite";
import onErrorImg from "../../../utils/errorImg";
import orgApi from "../../../api/organizationApi";
import { useSelector } from "react-redux";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  focusOnSelect: true,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  responsive: [],
  appendDots: (dots: any) => (
    <div>
      <ul>{dots}</ul>
    </div>
  ),
};
function DetailHead(props: any) {
  const { org, loading } = props;
  const history = useHistory();
  const { t } = useContext(AppContext);
  const { USER } = useSelector((state: any) => state.USER);
  const infoBox = useRef(null);
  const [openPopupContact, setOpenPopupContact] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const [orgFavorite, setOrgFavorite] = useState({
    favorite: false,
    count: 0
  })

  const handleOpenPopupContact = () => {
    setOpenPopupContact(true);
  };
  const handleGetOrgFollow = async () => {
    const org_id = (await org)?.id;
    try {
      const res = await orgApi.getOrgById(org_id);
      setOrgFavorite({
        favorite: res.data.context.is_favorite,
        count: res.data.context.favorites_count
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (org?.id) {
      handleGetOrgFollow()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org])
  const handleRemoveFavorite = async () => {
    setOrgFavorite({
      favorite: false, count: orgFavorite.count - 1
    })
    try {
      await favorites.deleteFavorite(org.id)
    } catch (error) {
      console.log(error)
    }
  }
  const handlePostFavorite = async () => {
    setOrgFavorite({ favorite: true, count: orgFavorite.count + 1 })
    try {
      await favorites.postFavorite(org.id);
    } catch (error) {
      console.log(error)
    }
  }
  const onOrgFavorite = () => {
    if (USER) {
      if (orgFavorite.favorite === true) {
        handleRemoveFavorite()
      } else {
        handlePostFavorite()
      }
    } else {
      history.push({ pathname: '/sign-in', search: '1' })
    }
  }
  return (
    <div className="mer-detail">
      <Container>
        <div className="mer-detail__content">
          <div ref={infoBox} className="mer-detail__content-left">
            {loading === true ? (
              <OrgCardLoading />
            ) : (
              <>
                <div className="content-left__header">
                  <img className="content-left__header-avt" src={org?.image && org?.image_url} alt="" onError={(e) => onErrorImg(e)} />
                  <div className="content-left__header-name">
                    <span>{org?.name}</span>
                    <div className="mer-detail__rate">
                      <span>4.5</span>
                      <img src={icon.star} alt="" />
                      <span>250</span>
                      <img src={icon.chatAll} alt="" />
                      <span>{orgFavorite.count}</span>
                      <img src={icon.Favorite} alt="" />
                    </div>
                  </div>
                </div>
                <div className="content-left__info">
                  <div className="content-left__info-detail">
                    <img src={icon.location} alt="" />
                    <p>
                      <span>
                        {t("Mer_de.address")}
                        {": "}
                      </span>
                      <span className="content-left__info-detail-add">
                        {org?.full_address}
                      </span>
                    </p>
                  </div>
                </div>

                {/* calendar work */}
                <DetailHeadOpenTime
                  org={org}
                  openTime={openTime}
                  setOpenTime={setOpenTime}
                />
                {/* end calendar work */}

                <div className="content-left__follow">
                  <button onClick={handleOpenPopupContact}>
                    {t("Mer_de.contact")}
                  </button>
                  <button
                    style={
                      orgFavorite.favorite === true && USER
                        ? {
                          backgroundColor: "var(--purple)",
                          color: "var(--bg-gray)",
                        }
                        : {}
                    }
                    onClick={onOrgFavorite}
                  >
                    {orgFavorite.favorite === true && USER
                      ? t("Mer_de.flowing")
                      : t("Mer_de.flow")}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="merchant-slider mer-detail__content-right">
            <Slider lazyLoad="progressive" {...settings}>
              <div className="merchant-slider__img">
                <img src={img.slider} alt="" />
              </div>
              <div className="merchant-slider__img">
                <img src={img.slider4} alt="" />
              </div>
              <div className="merchant-slider__img">
                <img src={img.slider} alt="" />
              </div>
              <div className="merchant-slider__img">
                <img src={img.slider4} alt="" />
              </div>
            </Slider>
          </div>
        </div>
      </Container>
      <PopupDetailContact
        setOpenPopupContact={setOpenPopupContact}
        openPopupContact={openPopupContact}
      />
    </div>
  );
}

export default DetailHead;
