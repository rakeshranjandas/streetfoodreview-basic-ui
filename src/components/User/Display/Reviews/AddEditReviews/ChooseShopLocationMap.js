import React from "react"

import { Marker, Popup } from "react-leaflet"

import {
  DefaultCenter,
  PinPositionIcon,
  MyPositionIcon,
  ChooseShopMapContainerSettings,
} from "../../../../Common/Map/MapSettings"

import CustomMapContainer from "../../../../Common/Map/CustomMapContainer"
import { LatLngToLocationStr } from "../../../../Common/MapLocationConvert"

export default function ChooseShopLocationMap(props) {
  const [centerPosition, setCenterPosition] = React.useState(DefaultCenter)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCenterPosition([pos.coords.latitude, pos.coords.longitude])
        props.setLocation(
          LatLngToLocationStr(pos.coords.latitude, pos.coords.longitude)
        )
      })
    }
  }, [])

  const markerRef = React.useRef()

  const markerEventHandlers = {
    drag: () => {
      const markerLocation = markerRef.current.getLatLng()
      props.setLocation(
        LatLngToLocationStr(markerLocation.lat, markerLocation.lng)
      )
    },
  }

  return (
    <CustomMapContainer
      mapSettings={ChooseShopMapContainerSettings}
      center={centerPosition}
    >
      <Marker position={centerPosition} icon={MyPositionIcon} />

      <Marker
        position={centerPosition}
        icon={PinPositionIcon}
        draggable={true}
        eventHandlers={markerEventHandlers}
        ref={markerRef}
      >
        <Popup>I am here.</Popup>
      </Marker>
    </CustomMapContainer>
  )
}
