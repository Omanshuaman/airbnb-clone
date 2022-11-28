import ReactMapGl, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import getCenter from "geolib/es/getCenter";
import { StarIcon } from "@heroicons/react/solid";

function Map({ searchResults, filterResults }) {
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const [selectedLocation, setSelectedLocation] = useState({});

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    pitch: 55, // pitch in degrees
    bearing: -50, // bearing in degrees
    zoom: 13,
  });
  console.log(process.env.mapbox_key);
  return (
    <ReactMapGl
      mapStyle="mapbox://styles/omanshu/clal0h53g004914ntbfq64bu2"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onMove={(evt) => setViewport(evt.viewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGl>
  );
}

export default Map;
