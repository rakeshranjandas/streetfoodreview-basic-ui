import React from "react"

import { Marker, Popup, useMapEvents } from "react-leaflet"

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
  const [addShopMarkerLocation, setAddShopMarkerLocation] =
    React.useState(centerPosition)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const newPos = [pos.coords.latitude, pos.coords.longitude]
        setCenterPosition(newPos)
        setAddShopMarkerLocation(newPos)
        props.setLocation(
          LatLngToLocationStr(pos.coords.latitude, pos.coords.longitude)
        )
      })
    }
  }, [])

  const markerRef = React.useRef()

  function updateMarkerLocation(newPos) {
    const markerLocation = newPos ?? markerRef.current.getLatLng()
    props.setLocation(
      LatLngToLocationStr(markerLocation.lat, markerLocation.lng)
    )
  }

  const markerEventHandlers = {
    drag: () => {
      updateMarkerLocation()
    },
  }

  return (
    <CustomMapContainer
      mapSettings={ChooseShopMapContainerSettings}
      center={centerPosition}
    >
      <Marker position={centerPosition} icon={MyPositionIcon}>
        <Popup>I am here.</Popup>{" "}
      </Marker>

      <ClickLayer
        updateMarkerLocationToTarget={(newPos) => {
          setAddShopMarkerLocation(newPos)
          updateMarkerLocation({ lat: newPos[0], lng: newPos[1] })
        }}
      />

      <Marker
        position={addShopMarkerLocation}
        icon={PinPositionIcon}
        draggable={true}
        eventHandlers={markerEventHandlers}
        ref={markerRef}
      ></Marker>
    </CustomMapContainer>
  )
}

function ClickLayer(props) {
  useMapEvents({
    click: (e) => {
      props.updateMarkerLocationToTarget([e.latlng.lat, e.latlng.lng])
    },
  })
}
