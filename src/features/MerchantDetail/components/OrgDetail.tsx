import React, { useContext, useRef, useState } from "react";
import { Container } from "@mui/material";
import { IOrganization } from "../../../interface/organization";
import onErrorImg from "../../../utils/errorImg";
import icon from "../../../constants/icon";
import Slider from "react-slick";
import {
    onActiveTab,
    onDeleteFavoriteOrg,
    onFavoriteOrg,
} from "../../../redux/org/orgSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PopupDetailContact from "./PopupDetailContact";
import { extraOrgTimeWork } from "./Functions/extraOrg";
import { AppContext } from "../../../context/AppProvider";
import { STATUS } from "../../../redux/status";
import { onToggleOpenChat } from '../../../redux/chat/chatOrgSlice'

interface IProps {
    org: IOrganization;
    galleries: [];
    status_galleries: string;
}

function OrgDetail(props: IProps) {
    const { org, galleries, status_galleries } = props;
    const { t } = useContext(AppContext);
    const { totalItem } = useSelector((state: any) => state.ORG_COMMENTS);
    const dispatch = useDispatch();
    const history = useHistory();
    const { USER } = useSelector((state: any) => state.USER);
    const [openPopupContact, setOpenPopupContact] = useState(false);

    // time works
    const now = new Date();
    const today = now.getDay() + 1;
    const orgTimes = extraOrgTimeWork(org?.opening_time);
    const time_works_today = orgTimes?.find(
        (item: any, index: number) => index + 2 === today
    );
    const refListTimeWorks = useRef<any>();
    const handleOpenSelector = () => {
        refListTimeWorks.current.classList.toggle("org-time-work__list-active");
    };

    // handle favorite Org
    const handleFavoriteOrg = () => {
        if (USER) {
            if (org?.is_favorite) {
                dispatch(onDeleteFavoriteOrg(org));
            } else {
                dispatch(onFavoriteOrg(org));
            }
        } else {
            history.push("/sign-in?1");
        }
    };

    // setting slider
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
        dispatch(onActiveTab(7));
    };
    const onOpenChatOrg = () => {
        dispatch(onToggleOpenChat(true))
    }
    return (
        <div className="org-detail">
            <Container>
                <div className="org-detail__cnt">
                    <div
                        onClick={onActiveTabGallery}
                        className="org-detail__cnt-top"
                    >
                        <Slider {...settings}>
                            {galleries.length === 0 &&
                                status_galleries === STATUS.SUCCESS && (
                                    <div className="org-detail__banner-de">
                                        <div className="org-detail__banner-de__item">
                                            <div className="back-drop">
                                                <img
                                                    style={{ width: "100%" }}
                                                    src={org?.image_url}
                                                    alt=""
                                                    className="back-drop__img"
                                                    onError={(e) =>
                                                        onErrorImg(e)
                                                    }
                                                />
                                                <div className="banner-item__cnt">
                                                    <img
                                                        src={org?.image_url}
                                                        alt=""
                                                        className="banner-item__img"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            {galleries.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className="org-detail__banner-de"
                                >
                                    <div className="org-detail__banner-de__item">
                                        <div className="back-drop">
                                            <img
                                                src={item?.image_url}
                                                alt=""
                                                className="back-drop__img"
                                            />
                                            <div className="banner-item__cnt">
                                                <img
                                                    src={item?.image_url}
                                                    alt=""
                                                    className="banner-item__img"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="wrap-bot">
                        <div className="org-detail__cnt-bot">
                            <div className="left">
                                <div className="org-detail__info">
                                    <div className="flexX-gap-8">
                                        <div className="org-avatar">
                                            <img
                                                src={org?.image_url}
                                                onError={(e) => onErrorImg(e)}
                                                alt=""
                                            />
                                        </div>
                                        <div className="org-left-detail">
                                            <span className="org-left-detail__name">
                                                {org?.name}
                                            </span>
                                            <div className="flexX-gap-4 org-left-detail__address">
                                                <img
                                                    src={icon.mapPinRed}
                                                    alt=""
                                                    className="icon"
                                                />
                                                <span className="title">
                                                    {org?.full_address}
                                                </span>
                                            </div>
                                            <div className="flexX-gap-8 org-left-detail__rate">
                                                <div className="flexX-gap-4 org-left-detail__rate-item">
                                                    <img
                                                        src={icon.star}
                                                        alt=""
                                                        className="icon"
                                                    />
                                                    <span className="text">
                                                        4.5
                                                    </span>
                                                </div>
                                                <div className="flexX-gap-4 org-left-detail__rate-item">
                                                    <img
                                                        src={icon.chatAll}
                                                        alt=""
                                                        className="icon"
                                                    />
                                                    <span className="text">
                                                        {totalItem}
                                                    </span>
                                                </div>
                                                <div className="flexX-gap-4 org-left-detail__rate-item">
                                                    <img
                                                        src={icon.heart}
                                                        alt=""
                                                        className="icon"
                                                    />
                                                    <span className="text">
                                                        {org?.favorites_count}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="org-time-work">
                                        <div className="flexX-gap-4 org-time-work__left">
                                            <img
                                                src={icon.Clock_purple}
                                                alt=""
                                                className="icon"
                                            />
                                            <span className="title">
                                                {t("Mer_de.time_work")}{" "}
                                                {time_works_today?.day_week}:
                                            </span>
                                        </div>
                                        <div className="flex-row org-time-work__right">
                                            <div
                                                onClick={() =>
                                                    handleOpenSelector()
                                                }
                                                className="flex-row-sp org-time-work__right-list"
                                            >
                                                {
                                                    time_works_today?.from_time_opening
                                                }{" "}
                                                -{" "}
                                                {
                                                    time_works_today?.to_time_opening
                                                }
                                                <img
                                                    src={icon.arrowDownPurple}
                                                    alt=""
                                                />
                                            </div>
                                            {/* selector time_works_today */}
                                            <ul
                                                ref={refListTimeWorks}
                                                className="org-time-work__list"
                                            >
                                                {orgTimes?.map(
                                                    (
                                                        item: any,
                                                        index: number
                                                    ) => (
                                                        <li
                                                            style={
                                                                index + 2 ===
                                                                    today
                                                                    ? {
                                                                        color: "var(--purple)",
                                                                    }
                                                                    : {}
                                                            }
                                                            key={index}
                                                            className="flex-row org-time-list__item"
                                                        >
                                                            <span className="org-time-list__left">
                                                                {item.day_week}
                                                            </span>
                                                            <div className="org-time-list__right">
                                                                {
                                                                    item?.from_time_opening
                                                                }{" "}
                                                                -{" "}
                                                                {
                                                                    item?.to_time_opening
                                                                }
                                                            </div>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <button
                                    style={
                                        org?.is_favorite
                                            ? {
                                                backgroundColor:
                                                    "var(--purple)",
                                                color: "var(--bgWhite)",
                                            }
                                            : {}
                                    }
                                    onClick={handleFavoriteOrg}
                                >
                                    {org?.is_favorite
                                        ? t("Mer_de.flowing")
                                        : t("Mer_de.flow")}
                                </button>
                                <br />
                                {/* <button
                                    onClick={() => {
                                        setOpenPopupContact(true);
                                    }}
                                >
                                    {t("Mer_de.contact")}
                                </button> */}
                                <button
                                    onClick={onOpenChatOrg}
                                >
                                    Chat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <PopupDetailContact
                openPopupContact={openPopupContact}
                setOpenPopupContact={setOpenPopupContact}
            />
        </div>
    );
}

export default OrgDetail;
