import React, { useState, useEffect, useContext, Component } from 'react';
const { Marker, DirectionsRenderer } = require('react-google-maps');

const DirectionRenderComponent = (props) => {
  const [fromLat, setFromLat] = useState(props.from.lat);
  const [fromLng, setFromLng] = useState(props.from.lng);
  const [toLat, setToLat] = useState(props.to.lat);
  const [toLng, setToLng] = useState(props.to.lng);
  const [directions, setDirections] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  let delayFactor = 0;

  useEffect(() => {
    const startLoc = fromLat + ", " + fromLng;
    const destinationLoc = toLat + ", " + toLng;
    getDirections(startLoc, destinationLoc);
  }, [fromLat, fromLng, toLat, toLng]);


  const getDirections = (startLoc, destinationLoc) => {
    const directionService = new window.google.maps.DirectionsService();
    directionService.route(
      {
        origin: startLoc,
        destination: destinationLoc,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        // console.log("status", status);
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else if (
          status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
        ) {
          delayFactor += 0.2;
          // if (this.delayFactor <= 10) this.delayFactor = 0.2;
          setTimeout(() => {
            getDirections(startLoc, destinationLoc, wayPoints);
          }, delayFactor * 200);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }


  let originMarker = null;
  let destinationMarker = null;
  if (directions) {
    originMarker = (
      <Marker
        icon={{ url: "hummingbird.png", scaledSize: new google.maps.Size(48, 48) }}
        position={{
          lat: parseFloat(fromLat),
          lng: parseFloat(fromLng)
        }}
      />
    );
    destinationMarker = (
      <Marker
        icon={{ url: "coffee-cup.png", scaledSize: new google.maps.Size(48, 48) }}
        position={{
          lat: parseFloat(toLat),
          lng: parseFloat(toLng)
        }}
      />
    );
  }
  return (
    <div>
      {originMarker}
      {destinationMarker}
      {currentLocation && (
        <Marker
          label={props.index.toString()}
          position={{
            lat: currentLocation.lat,
            lng: currentLocation.lng
          }}
        />
      )}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: '#921d25',
              strokeWeight: 4
            },
            preserveViewport: true,
            suppressMarkers: true,
            icon: { scale: 3 }
          }}
        />
      )}
    </div>
  );
}

export default DirectionRenderComponent;












