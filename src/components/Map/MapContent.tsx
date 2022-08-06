import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AUTH_LOCATION } from "../../api/authLocation";
import icon from "../../constants/icon";
import MapTagsGoogle from "./MapGoogle";
import MapTagsOrgItem from "./MapOrgItem";
import { fetchAsyncOrgsByFilter } from "../../redux/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Slider from "react-slick";
import MapTagsItemMB from "./MapItemMB";
import { onDeleteFavoriteOrg, onFavoriteOrg } from "../../redux/org/orgSlice";
interface IProps {
    onChangeCardMap?: any;
    org: any;
}

// const detail = document.querySelector(".dialog-map__detail");
// window.addEventListener("scroll", function () {
//     const scrolled = window.scrollY;
//     const de_header = document.querySelector(".content-head");
//     const windowPosition = scrolled > 30;
//     console.log("windowPosition :>> ", windowPosition);
//     if (de_header) {
//         de_header.classList.toggle("head-active", windowPosition);
//     }
// });

export default function MapContent(props: IProps) {
    const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const location = useLocation();
    const history = useHistory();
    const { USER } = useSelector((state: any) => state.USER);
    const dispatch = useDispatch();
    const { org, onChangeCardMap } = props;
    const slideRef = useRef<any>();
    const LOCATION = AUTH_LOCATION();
    const [openDetail, setOpenDetail] = useState<any>({
        open: false,
        item: {},
    });

    const onFavoriteOrganization = async () => {
        if (USER) {
            if (openDetail?.item.is_favorite === false) {
                await dispatch(onFavoriteOrg(openDetail?.item));
                // setOpenDetail({
                //     ...openDetail,
                //     item: {
                //         ...openDetail.item,
                //         is_favorite: true,
                //     },
                // });
            } else {
                await dispatch(onDeleteFavoriteOrg(openDetail?.item));
                // setOpenDetail({
                //     ...openDetail,
                //     item: {
                //         ...openDetail.item,
                //         is_favorite: false,
                //     },
                // });
            }
        } else {
            history.push("/sign-in");
        }
    };
    const [local, setLocal] = useState({
        lat: LOCATION ? parseFloat(LOCATION?.split(",")[0]) : org[0]?.latitude,
        long: LOCATION
            ? parseFloat(LOCATION?.split(",")[1])
            : org[0]?.longitude,
    });
    const refListOrg: any = useRef();
    const [openListOrg, setOpenListOrg] = useState(true);
    const { page, totalItem } = useSelector((state: any) => state.FILTER.ORGS);
    const handleToggleListOrg = () => {
        refListOrg.current.classList.toggle("list-org__active");
        setOpenListOrg(!openListOrg);
        setOpenDetail({
            ...openDetail,
            open: false,
        });
    };
    const handleSetLocation = useCallback((cardMapItem: any) => {
        if (onChangeCardMap) {
            onChangeCardMap(cardMapItem);
        }
        setLocal({
            lat: cardMapItem?.latitude,
            long: cardMapItem?.longitude,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGotoOrg = () => {
        history.push({
            pathname: `/org/${openDetail?.item.subdomain}`,
            // search: `${openDetail?.item.id}`,
            state: openDetail?.item,
        });
    };

    useEffect(() => {
        setLocal({
            lat: LOCATION
                ? parseFloat(LOCATION?.split(",")[0])
                : org[0]?.latitude,
            long: LOCATION
                ? parseFloat(LOCATION?.split(",")[1])
                : org[0]?.longitude,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [org, openDetail?.item]);

    const onViewMoreOrgs = () => {
        if (
            location.pathname === "/ban-do" &&
            totalItem >= 15 &&
            org.length < totalItem
        ) {
            dispatch(
                fetchAsyncOrgsByFilter({
                    page: page + 1,
                    sort: "distance",
                    path_url: location.pathname,
                })
            );
        }
    };

    const onGotoSlickOrgItem = (index: number) => {
        slideRef?.current?.slickGoTo(index);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerPadding: "30px",
        className: "center",
        centerMode: true,
        afterChange: function (index: any) {
            handleSetLocation(org[index]);
        },
    };

    return (
        <div className="map-content">
            <MapTagsGoogle
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
                loadingElement={<div style={{ height: `100%` }} />}
                zoom={16}
                org={org}
                location={local}
                containerElement={
                    <div
                        style={{
                            height: `100%`,
                            margin: `auto`,
                            width: `100%`,
                        }}
                    />
                }
                mapElement={<div style={{ height: `100%` }} />}
                onChangeCardMap={onChangeCardMap}
                setLocal={setLocal}
                onGotoSlickOrgItem={onGotoSlickOrgItem}
            />

            {/* list map desktop */}
            <div
                className={
                    openListOrg === true
                        ? "dialog-map__wrapper list-org__active "
                        : "dialog-map__wrapper"
                }
                ref={refListOrg}
            >
                {/* org list  */}
                <div id="scrollableDiv" className="dialog-map__list">
                    <InfiniteScroll
                        hasMore={true}
                        loader={<></>}
                        next={onViewMoreOrgs}
                        dataLength={org.length}
                        scrollableTarget="scrollableDiv"
                    >
                        {org?.map((item: any, index: number) => (
                            <MapTagsOrgItem
                                location={local}
                                handleSetLocation={handleSetLocation}
                                key={index}
                                item={item}
                                setOpenDetail={setOpenDetail}
                                openDetail={setOpenDetail}
                            />
                        ))}
                    </InfiniteScroll>
                </div>

                {/* org detail */}
                {openDetail.open === true ? (
                    <>
                        <div className="dialog-map__detail">
                            <div className="dialog-map__content">
                                <div className="content-head">
                                    <span className="content-head__name">
                                        {openDetail.item?.name}
                                    </span>
                                    <img
                                        onClick={() =>
                                            setOpenDetail({
                                                ...openDetail,
                                                open: false,
                                            })
                                        }
                                        src={icon.x}
                                        alt=""
                                    />
                                </div>
                                <div className="content-img">
                                    <img
                                        src={openDetail.item?.image_url}
                                        alt=""
                                    />
                                </div>
                                <div className="content-info">
                                    <span className="content-info__name">
                                        {openDetail.item?.name}
                                    </span>
                                    <div className="map-item__evaluate">
                                        <div className="evaluate-item">
                                            <img src={icon.star} alt="" />
                                            <p>5</p>
                                        </div>
                                        <div className="evaluate-item">
                                            <img
                                                src={icon.cartCheckPurple}
                                                alt=""
                                            />
                                            <p>10</p>
                                        </div>
                                        <div className="evaluate-item">
                                            <img src={icon.heart} alt="" />
                                            <p>
                                                {
                                                    openDetail.item?.favorites
                                                        ?.length
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="content-info__wrapbtn">
                                        <div
                                            onClick={() => handleGotoOrg()}
                                            className="content-info__btn"
                                        >
                                            <img src={icon.archive} alt="" />
                                            <span>Xem spa</span>
                                        </div>

                                        <div
                                            onClick={onFavoriteOrganization}
                                            className="content-info__btn"
                                        >
                                            <img src={icon.rss} alt="" />
                                            <span>Theo dõi</span>
                                        </div>
                                    </div>
                                    <span>
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Tenetur, veritatis
                                        earum quidem natus suscipit dolores
                                        voluptatum placeat asperiores eaque
                                        velit, voluptatibus reiciendis
                                        consectetur perferendis sint eius
                                        debitis praesentium voluptatem quis.
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Tenetur, veritatis
                                        earum quidem natus suscipit dolores
                                        voluptatum placeat asperiores eaque
                                        velit, voluptatibus reiciendis
                                        consectetur perferendis sint eius
                                        debitis praesentium voluptatem quis.
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Tenetur, veritatis
                                        earum quidem natus suscipit dolores
                                        voluptatum placeat asperiores eaque
                                        velit, voluptatibus reiciendis
                                        consectetur perferendis sint eius
                                        debitis praesentium voluptatem quis.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}

                {/* btn toggle open close list map org */}
                <div
                    onClick={() => {
                        handleToggleListOrg();
                    }}
                    className="open-list__org close"
                >
                    <img
                        src={
                            openListOrg === true
                                ? icon.arrownLeftWhite
                                : icon.arrownRightWhite
                        }
                        alt=""
                    />
                </div>
            </div>

            {/* list map mobile */}
            <div className="map-list__mobile">
                <Slider ref={slideRef} {...settings}>
                    {org.map((item: any, index: number) => (
                        <MapTagsItemMB key={index} item={item} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}
