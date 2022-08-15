import React from "react";
import MapBox from "./MapBox";

const key = "AIzaSyDfxBgfHh5HeBw2kVRcpgxgG4lswl50jTg";
// const lat = 10.7994639;
// const long = 106.6855589;
function MapWrapper(props: any) {
  const { itemCenter } = props;
  console.log(itemCenter);
  const lat = itemCenter?.latitude;
  const long = itemCenter?.longitude;
  return (
    <div className="mb-result-map">
      <MapBox
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
        loadingElement={<div style={{ height: `100%` }} />}
        zoom={16}
        lat={lat}
        lng={long}
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
    </div>
  );
}

export default MapWrapper;
