/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useRef, useState } from "react";
import icon from "../../../../constants/icon";
import { IOrganization } from "../../../../interface/organization";
import OrgMapGoogle from "./OrgMapGoogle";
import OrgMapItem from "./OrgMapItem";
import OrgMapListMB from "./OrgMapListMB";

interface IProps {
    org: IOrganization;
    onChangeCardMap?: (cardItem: any) => void;
}

export default function MapOrg(props: IProps) {
    const { org, onChangeCardMap } = props;
    const listOrg = [org].concat(org?.branches);
    const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const [location, setLocation] = useState({
        lat: org?.latitude,
        long: org?.longitude,
    });
    const refListOrg: any = useRef();
    const [openListOrg, setOpenListOrg] = useState(true);
    const handleToggleListOrg = () => {
        refListOrg.current.classList.toggle("list-org__active");
        setOpenListOrg(!openListOrg);
    };

    // const handleSetLocation = (cardMapItem: any) => {
    //     if (onChangeCardMap) {
    //         onChangeCardMap(cardMapItem);
    //     }
    //     setLocation({
    //         lat: cardMapItem?.latitude,
    //         long: cardMapItem?.longitude,
    //     });
    // };
    
    const handleSetLocation = useCallback((cardMapItem: any) => {
        if (onChangeCardMap) {
            onChangeCardMap(cardMapItem);
        }
        setLocation({
            lat: cardMapItem?.latitude,
            long: cardMapItem?.longitude,
        });
    }, []);
    useMemo(() => {
        setLocation({
            lat: org?.latitude,
            long: org?.longitude,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [org]);
    return (
        <div className="map-cnt">
            <OrgMapGoogle
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
                loadingElement={<div style={{ height: `100%` }} />}
                zoom={16}
                org={listOrg}
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
                    {listOrg?.map((item: any, index: number) => (
                        <OrgMapItem
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
            <OrgMapListMB
                handleSetLocation={handleSetLocation}
                listOrg={listOrg}
                location={location}
            />
        </div>
    );
}
