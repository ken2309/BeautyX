import React, { useCallback, useEffect, useRef, useState } from "react";
import icon from "../../constants/icon";
import MapTagsGoogle from "./MapGoogle";
import MapTagsListMB from "./MapListMB";
import MapTagsOrgItem from "./MapOrgItem";

export default function MapContent(props: any) {
    const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const { org, onChangeCardMap } = props;
    const [location, setLocation] = useState({
        lat: org[0]?.latitude,
        long: org[0]?.longitude,
    });
    const refListOrg: any = useRef();
    const [openListOrg, setOpenListOrg] = useState(true);
    const handleToggleListOrg = () => {
        refListOrg.current.classList.toggle("list-org__active");
        setOpenListOrg(!openListOrg);
    };
    const handleSetLocation = useCallback((cardMapItem: any) => {
        if (onChangeCardMap) {
            onChangeCardMap(cardMapItem);
        }
        setLocation({
            lat: cardMapItem?.latitude,
            long: cardMapItem?.longitude,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setLocation({
            lat: org[0]?.latitude,
            long: org[0]?.longitude,
        });

        console.log("first");
    }, [org]);
    return (
        <div className="map-content">
            <MapTagsGoogle
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
                loadingElement={<div style={{ height: `100%` }} />}
                zoom={16}
                org={org}
                location={location}
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
            />
            <div
                className={
                    openListOrg === true
                        ? "dialog-map__wrapper list-org__active "
                        : "dialog-map__wrapper"
                }
                ref={refListOrg}
            >
                <div className="dialog-map__list">
                    {org?.map((item: any, index: number) => (
                        <MapTagsOrgItem
                            location={location}
                            handleSetLocation={handleSetLocation}
                            key={index}
                            item={item}
                        />
                    ))}
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
            <MapTagsListMB
                handleSetLocation={handleSetLocation}
                listOrg={org}
                location={location}
            />
        </div>
    );
}
