import React from 'react';
import { Container } from '@mui/material';
import { IOrganization } from '../../../interface/organization';
import onErrorImg from '../../../utils/errorImg';
import icon from '../../../constants/icon';
import Slider from "react-slick";
import { onActiveTab, onDeleteFavoriteOrg, onFavoriteOrg } from '../../../redux/org/orgSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

interface IProps {
    org: IOrganization,
    galleries: []
}

function OrgDetail(props: IProps) {
    const { org, galleries } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const { USER } = useSelector((state: any) => state.USER);
    const handleFavoriteOrg = () => {
        if (USER) {
            if (org?.is_favorite) {
                dispatch(onDeleteFavoriteOrg(org))
            } else {
                dispatch(onFavoriteOrg(org))
            }
        } else {
            history.push('/sign-in?1')
        }
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        //autoplay: true,
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
    };
    const onActiveTabGallery = () => {
        dispatch(onActiveTab(6))
    }
    return (
        <div className="org-detail">
            <Container>
                <div className="org-detail__cnt">
                    <div onClick={onActiveTabGallery} className="org-detail__cnt-top">
                        <Slider {...settings}>
                            {
                                galleries.map((item: any, index: number) => (
                                    <div key={index} className="org-detail__banner-de">
                                        <div className="org-detail__banner-de__item">
                                            <div className="back-drop">
                                                <img src={item?.image_url} alt="" className="back-drop__img" />
                                                <div className="banner-item__cnt">
                                                    <img src={item?.image_url} alt="" className="banner-item__img" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                    <div className="wrap-bot">
                        <div className="flex-row-sp org-detail__cnt-bot">
                            <div className="left">
                                <div className="flex-row">
                                    <div className="org-avatar">
                                        <img src={org.image_url} onError={(e) => onErrorImg(e)} alt="" />
                                    </div>
                                    <div className="org-left-detail">
                                        <span className="org-left-detail__name">{org?.name}</span>
                                        <div className="flex-row org-left-detail__address">
                                            <img src={icon.mapPinRed} alt="" className="icon" />
                                            <span className="title">{org?.full_address}</span>
                                        </div>
                                        <div className="flex-row org-left-detail__rate">
                                            <div className="flex-row org-left-detail__rate-item">
                                                <img src={icon.star} alt="" className="icon" />
                                                <span className="text">4.5</span>
                                            </div>
                                            <div className="flex-row org-left-detail__rate-item">
                                                <img src={icon.chatAll} alt="" className="icon" />
                                                <span className="text">4.5</span>
                                            </div>
                                            <div className="flex-row org-left-detail__rate-item">
                                                <img src={icon.heart} alt="" className="icon" />
                                                <span className="text">{org.favorites_count}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-row-sp org-time-work">
                                    <div className="flex-row org-time-work__left">
                                        <img src={icon.Clock_purple} alt="" className="icon" />
                                        <span className="title">Thời gian mở của</span>
                                    </div>
                                    <div className="flex-row org-time-work__right">
                                        <span className="time">09:00 - 12:00</span>
                                        <div className="flex-row-sp org-time-work__right-list">
                                            <span className="day-week">Thứ 2 - Thứ 7</span>
                                            <img src={icon.chevronDownWhite} alt="" className="icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <button
                                    style={org?.is_favorite ? { backgroundColor: "var(--purple)", color: "var(--bgWhite)" } : {}}
                                    onClick={handleFavoriteOrg}
                                >
                                    {org?.is_favorite ? 'Đang theo dõi' : "Theo dõi"}
                                </button>
                                <br />
                                <button>Liên hệ tư vấn</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default OrgDetail;