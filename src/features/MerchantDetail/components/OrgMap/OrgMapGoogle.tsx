import React from "react";
import "../../../MerchantDetail/style.css";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
} from "react-google-maps";

import icon from "../../../../constants/icon";
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
const OrgMapGoogle = (props: any) => {
    const { zoom, location, org } = props;
    const defaultMapOptions = {
        fullscreenControl: true,
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
    };

    // const listMarker = [org].concat(org?.branches);
    return (
        <div>
            <GoogleMap
                defaultOptions={defaultMapOptions}
                zoom={zoom}
                center={{ lat: location.lat, lng: location.long }}
            >
                {org?.map((item: any, index: number) => (
                    <Marker
                        icon={{
                            url:
                                item.latitude === location.lat
                                    ? icon.pinMapGreen
                                    : icon.pinMap,
                        }}
                        position={{ lat: item.latitude, lng: item.longitude }}
                        //animation={item?.latitude === location.lat ? window.google.maps.Animation.DROP : null}
                    >
                        {
                            <InfoWindow>
                                <div className="tooltip">{item?.name}</div>
                            </InfoWindow>
                        }
                    </Marker>
                ))}
            </GoogleMap>
        </div>
    );
};
export default withScriptjs(withGoogleMap(OrgMapGoogle));
