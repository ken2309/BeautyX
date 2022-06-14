import React, { useEffect, useState } from "react";
import { IOrganization } from "../../../../interface/organization";
import OrgMapGoogle from "../../../MerchantDetail/components/OrgMap/OrgMapGoogle";
interface IProps {
    org: IOrganization;
}
export default function BookingMap(props: IProps) {
    const { org } = props;
    const listOrg = [org].concat(org?.branches);
    const key = "AIzaSyDfxBgfHh5HeBw2kVRcpgxgG4lswl50jTg";
    const [location, setLocation] = useState({
        lat: org?.latitude,
        long: org?.longitude,
    });
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
        <>
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
        </>
    );
}
