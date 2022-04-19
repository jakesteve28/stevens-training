import React, { useEffect, useRef } from 'react'
import { GoogleMap, InfoWindow, Marker, useJsApiLoader  } from '@react-google-maps/api';
function LocationMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD5ZPRCZfOz-xwATDqts_3JhOnNPpQOm1M"
  })
  const containerStyle = {
    width: '100%',
    minHeight: '400px',
    height: '100%',
    borderRadius: '15px',
    border: '5px solid #050505'
  };
  const [map, setMap] = React.useState(null)
  const [loc, setLoc] = React.useState({ lat: 0, lng: 0 });
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
    const location =  { 
      lat: 0,
      lng: 0
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      location.lat = position.coords.latitude;
      location.lng = position.coords.longitude;
      setLoc(location)
      map.panTo(location);
      map.zoom = 12;
    });
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const markerRef = useRef(null);

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={loc}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker ref={markerRef} position={{ lat: 45.6590, lng: -122.5847 }} label={{text:`Gold's Gym`,color:'#DDDDDD', fontSize: "12pt", fontWeight: "400"}} />
      </GoogleMap>
  ) : <></>
}

export default React.memo(LocationMap)