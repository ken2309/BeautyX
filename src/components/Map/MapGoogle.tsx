import React from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
} from "react-google-maps";
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import { AUTH_LOCATION } from "../../api/authLocation";
import icon from "../../constants/icon";
import { IOrganization } from "../../interface/organization";
import useDeviceMobile from "../../utils/useDeviceMobile";

const MapTagsGoogle = (props: any) => {
    const { zoom, location, org, onChangeCardMap, setLocal, onGotoSlickOrgItem } = props;
    const IS_MB = useDeviceMobile();
    const defaultMapOptions = {
        fullscreenControl: true,
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
    };
    let USER_LAT:any = 0;
    let USER_LNG:any = 0;
    const LOCATION = AUTH_LOCATION()
    if (LOCATION) {
        USER_LAT = parseFloat(LOCATION.split(",")[0])
        USER_LNG = parseFloat(LOCATION.split(",")[1])
    }
    const onMarkerClick = (item: IOrganization, index:number)=>{
        // document.getElementById(`${item.id}`)?.scrollIntoView()
        if(onChangeCardMap){
            onChangeCardMap(item)
        }
        if(setLocal){
            setLocal({
                lat: item.latitude,
                long: item.longitude
            })
        }
        if(IS_MB && onGotoSlickOrgItem){
            onGotoSlickOrgItem(index)
        }

    }
    return (
        <div>
            <GoogleMap
                defaultOptions={defaultMapOptions}
                zoom={zoom}
                // defaultCenter={{ lat: location.lat, lng: location.long }}
                center={{ lat: location.lat, lng: location.long }}
            >
                {
                    LOCATION &&
                    <Marker
                        icon={{
                            url: icon.pinMapRed
                        }}
                        position={{ lat: USER_LAT, lng: USER_LNG }}
                    //animation={item?.latitude === location.lat ? window.google.maps.Animation.DROP : null}
                    >
                        {
                            <InfoWindow>
                                <div className="tooltip tooltip-current">Vị trí của bạn</div>
                            </InfoWindow>
                        }
                    </Marker>
                }
                {org?.map((item: IOrganization, index: number) => (
                    <Marker
                        onClick={()=>onMarkerClick(item, index)}
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
