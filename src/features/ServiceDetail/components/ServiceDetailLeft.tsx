import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import icon from "../../../constants/icon";
import {
    fetchAsyncCancelFavoriteService,
    fetchAsyncFavoriteService,
} from "../../../redux/org_services/serviceSlice";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";
import Slider from "react-slick";
import useFullScreen from "../../../utils/useFullScreen";
const PrevButton = (props: any) => {
    const { onClick } = props;
    return (
        <button onClick={onClick} className="detail-btn__prev">
            <img
                className="detail-btn__prev-img"
                src={icon.chevronRight}
                alt=""
            />
        </button>
    );
};
const NextButton = (props: any) => {
    const { onClick } = props;
    return (
        <button onClick={onClick} className="detail-btn__next">
            <img
                className="detail-btn__next-img"
                src={icon.chevronRight}
                alt=""
            />
        </button>
    );
};
export default function ServiceDetailLeft(props: any) {
    const { org, service } = props;
    const videoRef = useRef<any>();
    const history = useHistory();
    const dispatch = useDispatch();
    const percent = service
        ? Math.round(100 - (service.special_price / service?.price) * 100)
        : null;
    const { USER } = useSelector((state: any) => state.USER);
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const is_mb = useFullScreen();

    const onFavorite = async () => {
        if (USER) {
            const valueService = {
                org_id: org?.id,
                detail: service,
            };
            if (service.is_favorite === false) {
                await dispatch(fetchAsyncFavoriteService(valueService));
            } else {
                await dispatch(fetchAsyncCancelFavoriteService(valueService));
            }
        } else {
            history.push("/sign-in");
        }
    };

    const setting: any = {
        infinite: is_mb === true ? true : false,
        speed: 100,
        asNavFor: is_mb === true ? null : nav2,
        fade: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextButton />,
        prevArrow: <PrevButton />,
        swipe: true,
        ref: is_mb === true ? null : (slider1: any) => setNav1(slider1),
    };

    const settingNav: any = {
        infinite: true,
        // arrows: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: is_mb === true ? null : nav1,
        ref: is_mb === true ? null : (slider2: any) => setNav2(slider2),
        // nextArrow: <NextButton />,
        // prevArrow: <PrevButton />,
        swipe: true,
        swipeToSlide: true,
        focusOnSelect: true,
    };
    return (
        <div className="service-detail__left flex-column">
            <div className="service-detail__wrap">
                <div className="detail-left__img">
                    <Slider {...setting}>
                        {service?.video && (
                            <div className="detail-left__img-item detail-left__img-item-vd">
                                <video
                                    className="detail-left__img-bg"
                                    autoPlay={true}
                                    loop
                                    muted
                                >
                                    <source src={service?.video_url} />
                                </video>
                                <video
                                    webkit-playsinline="webkit-playsinline"
                                    className="detail-left__img-item-video"
                                    controls
                                    autoPlay={true}
                                    loop
                                    muted
                                >
                                    <source src={service?.video_url} />
                                </video>
                            </div>
                        )}
                        <div className="detail-left__img-item">
                            <img
                                src={
                                    service?.image_url
                                        ? service?.image_url
                                        : org?.image_url
                                }
                                alt=""
                                onError={(e) => onErrorImg(e)}
                            />
                        </div>
                    </Slider>
                </div>
                {service?.video ? (
                    <div className="detail-left__slider-nav">
                        <Slider {...settingNav}>
                            {service?.video && (
                                <div className="slider-nav__video">
                                    <video
                                        className="slider-video"
                                        autoPlay={false}
                                        muted
                                    >
                                        <source src={service?.video_url} />
                                    </video>
                                </div>
                            )}
                            <div className="slider-nav__img">
                                <img
                                    src={
                                        service?.image_url
                                            ? service?.image_url
                                            : org?.image_url
                                    }
                                    alt=""
                                    onError={(e) => onErrorImg(e)}
                                />
                            </div>
                        </Slider>
                    </div>
                ) : null}
            </div>
            {/* detail service mobile */}
            <div className="service-detail__mobile">
                <div className="service-detail__mobile-top">
                    <p className="service-detail__mobile-name">
                        {service.service_name}
                    </p>
                    <div
                        onClick={onFavorite}
                        className="service-detail__mobile-favorite"
                    >
                        <img
                            src={
                                service?.is_favorite ? icon.heart : icon.unHeart
                            }
                            alt=""
                        />
                    </div>
                </div>

                <div className="service-detail__mobile-mid">
                    <img src={icon.alarmClock} alt="" />
                    <p className="service-detail__mobile-duration">
                        {service.duration} phút
                    </p>
                </div>

                <div className="service-detail__mobile-bottom">
                    {service?.special_price > 0 && (
                        <div className="service-detail__mobile-percent">
                            Giảm {percent}%
                        </div>
                    )}
                    <div className="service-detail__mobile-price">
                        {service?.special_price > 0 ? (
                            <>
                                <span>
                                    {formatPrice(service?.special_price)}đ
                                </span>
                                <span>{formatPrice(service?.price)}đ</span>
                            </>
                        ) : (
                            <span>{formatPrice(service?.price)}đ</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
