import React, { useRef } from "react";
// import {
//     withGoogleMap,
//     withScriptjs,
//     GoogleMap,
//     Marker,
// } from "react-google-maps";
// import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import icon from "../../constants/icon";
import { IOrganization } from "../../interface/organization";
import { StandaloneSearchBox, GoogleMap, Marker, LoadScript, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
    height: "100vh",
    width: "100vw"
};

const center = {
    lat: 38.685,
    lng: -115.234
};

const MapTagsGoogle = (props: any) => {
    const { zoom, location, org } = props;
    const defaultMapOptions = {
        fullscreenControl: true,
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
    };
    const searchRef = useRef<any>();
    const onPlacesChanged = () => {
        console.log(searchRef?.current?.getPlaces())
    }
    const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    return (
        <LoadScript
            id="script-loader" googleMapsApiKey={`${key}`} libraries={["places"]}
        >
            <GoogleMap
                // defaultOptions={defaultMapOptions}
                // zoom={zoom}
                // defaultCenter={{ lat: location.lat, lng: location.long }}
                // center={{ lat: location.lat, lng: location.long }}
                id="searchbox-example"
                mapContainerStyle={mapContainerStyle}
                zoom={zoom}
                center={{ lat: location.lat, lng: location.long }}
            >
                <StandaloneSearchBox
                    ref={searchRef}
                    onPlacesChanged={
                        onPlacesChanged
                    }
                >
                    <input
                        type="text"
                        placeholder="Customized your placeholder"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            position: "absolute",
                            left: "50%",
                            marginLeft: "-120px"
                        }}
                    />
                </StandaloneSearchBox>

                {org?.map((item: IOrganization, index: number) => (
                    <Marker
                        key={index}
                        icon={{
                            url:
                                item?.latitude === location.lat
                                    ? icon.pinMapGreen
                                    : icon.pinMap,
                        }}
                        position={{ lat: item?.latitude, lng: item?.longitude }}
                    //animation={item?.latitude === location.lat ? window.google.maps.Animation.DROP : null}
                    >
                        {/* <InfoWindow/> */}
                        {/* {
                            <InfoWindow>
                                <div className="tooltip">{item?.name}</div>
                            </InfoWindow>
                        } */}
                    </Marker>
                ))}
            </GoogleMap>
        </LoadScript>
    )
};
// export default withScriptjs(withGoogleMap(MapTagsGoogle));
export default MapTagsGoogle
