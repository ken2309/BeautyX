import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AUTH_LOCATION } from "../../api/authLocation";
import icon from "../../constants/icon";
import MapTagsGoogle from "./MapGoogle";
import MapTagsOrgItem from "./MapOrgItem";
import { fetchAsyncOrgsByFilter } from "../../redux/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Slider from "react-slick";
import MapTagsItemMB from "./MapItemMB";


export default function MapContent(props: any) {
    const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const location = useLocation();
    const dispatch = useDispatch();
    const { org, onChangeCardMap } = props;

    const slideRef = useRef<any>();

    const LOCATION = AUTH_LOCATION()
    const [local, setLocal] = useState({
        lat: LOCATION ? parseFloat(LOCATION?.split(",")[0]) : org[0]?.latitude,
        long: LOCATION ? parseFloat(LOCATION?.split(",")[1]) : org[0]?.longitude,
    });
    const refListOrg: any = useRef();
    const [openListOrg, setOpenListOrg] = useState(true);
    const { page, totalItem } = useSelector((state: any) => state.FILTER.ORGS);
    const handleToggleListOrg = () => {
        refListOrg.current.classList.toggle("list-org__active");
        setOpenListOrg(!openListOrg);
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

    useEffect(() => {
        setLocal({
            lat: LOCATION ? parseFloat(LOCATION?.split(",")[0]) : org[0]?.latitude,
            long: LOCATION ? parseFloat(LOCATION?.split(",")[1]) : org[0]?.longitude,
        });
    }, [org]);

    const onViewMoreOrgs = () => {
        if (location.pathname === "/ban-do"
            && totalItem >=15 && org.length < totalItem
        ) {
            dispatch(fetchAsyncOrgsByFilter({
                page: page + 1,
                sort: "distance",
                path_url: location.pathname
            }))
        }
    }

    const onGotoSlickOrgItem = (index: number) => {
        slideRef?.current?.slickGoTo(index);
    }

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
            <div
                className={
                    openListOrg === true
                        ? "dialog-map__wrapper list-org__active "
                        : "dialog-map__wrapper"
                }
                ref={refListOrg}
            >

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
                            />
                        ))}
                    </InfiniteScroll>
                </div>
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
