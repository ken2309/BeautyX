import React from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
} from "react-google-maps";
import icon from "../../../../constants/icon";
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import { IOrganization } from "../../../../interface/organization";

const MapTagsGoogle = (props: any) => {
    const { zoom, location, org } = props;
    const defaultMapOptions = {
        fullscreenControl: true,
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
    };
    return (
        <div>
            <GoogleMap
                defaultOptions={defaultMapOptions}
                zoom={zoom}
                defaultCenter={{ lat: location.lat, lng: location.long }}
                center={{ lat: location.lat, lng: location.long }}
            >
                {org?.map((item: IOrganization, index: number) => (
                    <Marker
                        icon={{
                            url:
                                item?.latitude === location.lat
                                    ? icon.pinMapGreen
                                    : icon.pinMap,
                        }}
                        position={{ lat: item?.latitude, lng: item?.longitude }}
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
export default withScriptjs(withGoogleMap(MapTagsGoogle));
