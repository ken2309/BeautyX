import React, { useRef, useState, useContext } from "react";
import { Container } from "@mui/material";
import icon from "../../../constants/icon";
import { AppContext } from "../../../context/AppProvider";
import OrgCardLoading from "../../Loading/OrgCardLoading";
import PopupDetailContact from "./PopupDetailContact";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import DetailHeadOpenTime from "../components/DetailHeadOpenTime";
import { useHistory } from 'react-router-dom'
import onErrorImg from "../../../utils/errorImg";
import { useSelector, useDispatch } from "react-redux";
import { STATUS } from '../../../redux/status';
import { onDeleteFavoriteOrg, onFavoriteOrg } from '../../../redux/org/orgSlice';
import DetailGalleries from "./DetailGalleries";
import useFullScreen from '../../../utils/useFullScreen';

function DetailHead(props: any) {
  const { org, status } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useContext(AppContext);
  const fullScreen = useFullScreen();
  const { USER } = useSelector((state: any) => state.USER);
  const { GALLERIES } = useSelector((state: any) => state.ORG);
  const ORG_COMMENTS = useSelector((state: any) => state.ORG_COMMENTS);
  const { totalItem } = ORG_COMMENTS;
  const infoBox = useRef(null);
  const [openPopupContact, setOpenPopupContact] = useState(false);
  const [openGalleries, setOpenGalleries] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [imgThumb, setImgThumb] = useState(GALLERIES.galleries[0])
  const handleOpenPopupContact = () => {
    setOpenPopupContact(true);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    //autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [],
    afterChange: function (index: any) {
      setImgThumb(GALLERIES.galleries[index]);
    },
    appendDots: (dots: any) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
  };
  const onOrgFavorite = () => {
    if (USER) {
      if (org?.is_favorite === true) {
        dispatch(onDeleteFavoriteOrg(org))
      } else {
        dispatch(onFavoriteOrg(org))
      }
    } else {
      history.push({ pathname: '/sign-in', search: '1' })
    }
  }
  const onOpenGalleries = () => {
    if (!imgThumb) {
      setImgThumb(GALLERIES.galleries[0])
    }
    setOpenGalleries(true)
  }
  return (
    <div className="mer-detail">
      <Container>
        <div className="mer-detail__content">
          <div ref={infoBox} className="mer-detail__content-left">
            {status === STATUS.LOADING ? (
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
                      <span>{totalItem}</span>
                      <img src={icon.chatAll} alt="" />
                      <span>{org?.favorites_count}</span>
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
                      org?.is_favorite === true && USER
                        ? {
                          backgroundColor: "var(--purple)",
                          color: "var(--bg-gray)",
                        }
                        : {}
                    }
                    onClick={onOrgFavorite}
                  >
                    {org?.is_favorite === true && USER
                      ? t("Mer_de.flowing")
                      : t("Mer_de.flow")}
                  </button>
                </div>
              </>
            )}
          </div>
          <div
            onClick={onOpenGalleries}
            className="merchant-slider mer-detail__content-right"
          >
            <Slider lazyLoad="progressive" {...settings}>
              {
                fullScreen &&
                <div className="banner-clone__cnt">
                  <img src={org?.image_url} alt="" />
                  <div className="banner-clone__org">
                    <div className="banner-org-head">
                      <img src={org?.image_url} alt="" className="org-avatar" />
                      <div className="org-de">
                        <span className="name">{org?.name}</span>
                        <div className="flex-row banner-org-head__rate">
                          <span>4.5</span>
                          <img src={icon.star} alt="" />
                          <span>{totalItem}</span>
                          <img src={icon.chatAll} alt="" />
                          <span>{org?.favorites_count}</span>
                          <img src={icon.Favorite} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {
                GALLERIES.galleries.map((item: any, index: number) => (
                  <div key={index} className="merchant-slider__img">
                    <img src={item.image_url} alt="" />
                  </div>
                ))
              }
            </Slider>
          </div>
        </div>
      </Container>
      <PopupDetailContact
        setOpenPopupContact={setOpenPopupContact}
        openPopupContact={openPopupContact}
      />
      <DetailGalleries
        open={openGalleries}
        setOpen={setOpenGalleries}
        imgThumb={imgThumb}
        setImgThumb={setImgThumb}
        GALLERIES={GALLERIES}
      />
    </div>
  );
}

export default DetailHead;

