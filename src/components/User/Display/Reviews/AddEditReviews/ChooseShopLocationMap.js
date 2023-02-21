import React from "react"

import { Marker, Popup } from "react-leaflet"

import {
  DefaultCenter,
  MyPositionIcon,
  ChooseShopMapContainerSettings,
} from "../../../../Common/Map/MapSettings"

import CustomMapContainer from "../../../../Common/Map/CustomMapContainer"

function toLocationString(lat, lng) {
  return lat + "," + lng
}

export default function ChooseShopLocationMap(props) {
  const [centerPosition, setCenterPosition] = React.useState(DefaultCenter)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCenterPosition([pos.coords.latitude, pos.coords.longitude])
        props.setLocation(
          toLocationString(pos.coords.latitude, pos.coords.longitude)
        )
      })
    }
  }, [])

  const markerRef = React.useRef()

  const markerEventHandlers = {
    drag: () => {
      const markerLocation = markerRef.current.getLatLng()
      props.setLocation(
        toLocationString(markerLocation.lat, markerLocation.lng)
      )
    },
  }

  return (
    <CustomMapContainer
      mapSettings={ChooseShopMapContainerSettings}
      center={centerPosition}
    >
      <Marker
        position={centerPosition}
        icon={MyPositionIcon}
        draggable={true}
        eventHandlers={markerEventHandlers}
        ref={markerRef}
      >
        <Popup>I am here.</Popup>
      </Marker>
    </CustomMapContainer>
  )
}
