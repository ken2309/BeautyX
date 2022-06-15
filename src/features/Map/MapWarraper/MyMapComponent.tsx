/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';


function MyMapComponent(props: any) {
    const { map, setMap, center, zoom } = props;
    const mapRef = useRef<any>();
    useEffect(() => {
        const newMap = new window.google.maps.Map(mapRef.current, {
            disableDefaultUI: true
        })
        newMap.setCenter(center)
        newMap.setZoom(zoom)
        setMap(newMap)
    }, []);
    return (
        <div
            style={{
                width: "100%",
                height: "100%"
            }}
            ref={mapRef}
            id="map"
        />
    );
}

export default MyMapComponent;