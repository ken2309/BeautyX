import React, { useEffect, useState } from 'react';
import MapGoogle from './components/MapGoogle';
import OrgItemMap from './components/OrgItemMap';
import './map.css';
import { IOrganization } from '../../interface/organization';


function Map(props: any) {
    const { data, setData } = props;
    const key = "AIzaSyDfxBgfHh5HeBw2kVRcpgxgG4lswl50jTg";
    const [location, setLocation] = useState({
        lat: 0,
        long: 0
    })
    useEffect(() => {
        setLocation({
            lat: data.orgs[0]?.latitude,
            long: data.orgs[0]?.longitude
        })
    }, [data.orgs])
    const handleSetLocation = (org: IOrganization) => {
        setLocation({
            lat: org.latitude,
            long: org.longitude
        })
    }
    return (
        <div
            className='map-cnt'
        >
            <MapGoogle
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
                loadingElement={<div style={{ height: `100%` }} />}
                zoom={16}
                orgs={data.orgs}
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
            <div className="map__list-item">
                <ul className="list">
                    {
                        data.orgs.map((item: any, index: number) => (
                            <li
                                key={index}
                            >
                                <OrgItemMap
                                    org={item}
                                    handleSetLocation={handleSetLocation}
                                />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Map;