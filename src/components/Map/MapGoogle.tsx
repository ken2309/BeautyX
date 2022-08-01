import React, { useRef } from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
} from "react-google-maps";
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import icon from "../../constants/icon";
import { IOrganization } from "../../interface/organization";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";

const MapTagsGoogle = (props: any) => {
    const { zoom, location, org } = props;
    const defaultMapOptions = {
        fullscreenControl: true,
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
    };
    const searchBoxRef = useRef<any>();
    const onPlacesChanged = () => {
        let res = searchBoxRef?.current?.getPlaces();
        console.log(res)
    }
    return (
        <div>
            <GoogleMap
                defaultOptions={defaultMapOptions}
                zoom={zoom}
                defaultCenter={{ lat: location.lat, lng: location.long }}
                center={{ lat: location.lat, lng: location.long }}
            >
                {/* <StandaloneSearchBox
                    ref={searchBoxRef}
                    onPlacesChanged={onPlacesChanged}
                bounds={this.state.bounds}
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
                </StandaloneSearchBox> */}
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
