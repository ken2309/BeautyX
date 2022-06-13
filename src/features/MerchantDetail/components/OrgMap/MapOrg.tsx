import React, { useEffect, useRef, useState } from "react";
import icon from "../../../../constants/icon";
import { IOrganization } from "../../../../interface/organization";
import OrgMapGoogle from "./OrgMapGoogle";
import OrgMapItem from "./OrgMapItem";
import OrgMapListMB from "./OrgMapListMB";

export default function MapOrg(props: any) {
    const { org } = props;
    const listOrg = [org].concat(org?.branches);
    const key = "AIzaSyDfxBgfHh5HeBw2kVRcpgxgG4lswl50jTg";
    const [location, setLocation] = useState({
        lat: org?.latitude,
        long: org?.longitude,
    });
    const refListOrg: any = useRef();
    const [openListOrg] = useState(true);
    const handleOpenListOrg = () => {
        refListOrg.current.classList.add("list-org__active");
    };
    const handleCloseListOrg = () => {
        refListOrg.current.classList.remove("list-org__active");
    };
    const handleSetLocation: any = (listOrg: IOrganization) => {
        setLocation({
            lat: listOrg?.latitude,
            long: listOrg?.longitude,
        });
    };
    useEffect(() => {
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
                onClick={() => {
                    handleOpenListOrg();
                }}
                className="open-list__org open"
            >
                <img src={icon.arrownRightWhite} alt="" />
            </div>
            <div
                ref={refListOrg}
                className={
                    openListOrg === true
                        ? "dialog-map__list list-org__active "
                        : "dialog-map__list"
                }
            >
                {listOrg?.map((item: any, index: number) => (
                    <OrgMapItem
                        location={location}
                        handleSetLocation={handleSetLocation}
                        key={index}
                        item={item}
                    />
                ))}
                <div
                    onClick={() => {
                        handleCloseListOrg();
                    }}
                    className="open-list__org close"
                >
                    <img src={icon.arrownLeftWhite} alt="" />
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
