import React, { useEffect, useRef, useState } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css'

// mapboxgl.accessToken = 'pk.eyJ1IjoidG9hbjA2MDExOTk4IiwiYSI6ImNsM2wzZzBpbDAxODUzcnA0cjlmb3V3OGoifQ.ndRxWrmEcI0r_E0wbJ0-6w';

function MapBox() {
    // const mapContainer = useRef<any>(null);
    // const map = useRef<any>(null);
    // const [lng, setLng] = useState(106.68205401591362);
    // const [lat, setLat] = useState(10.800590217284448);
    // const [zoom, setZoom] = useState(9);
    const Map = ReactMapboxGl({
        accessToken:
            'pk.eyJ1IjoidG9hbjA2MDExOTk4IiwiYSI6ImNsM2wzZzBpbDAxODUzcnA0cjlmb3V3OGoifQ.ndRxWrmEcI0r_E0wbJ0-6w'
    });
    // useEffect(() => {
    //     if (map.current) return; // initialize map only once
    //     map.current = new mapboxgl.Map({
    //         container: mapContainer.current,
    //         style: 'mapbox://styles/mapbox/streets-v11',
    //         center: [lng, lat],
    //         zoom: zoom
    //     });
    // });
    return (
        <div>
            {/* <div ref={mapContainer} className="map-container" /> */}
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
            >
                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                </Layer>
            </Map>
        </div>
    );
}

export default MapBox;