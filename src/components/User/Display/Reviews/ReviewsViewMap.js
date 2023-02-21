import React from "react"

import { Marker, Popup } from "react-leaflet"

import {
  DefaultCenter,
  MyPositionIcon,
  ReviewsMapContainerSettings,
} from "../../../Common/Map/MapSettings"

import CustomMapContainer from "../../../Common/Map/CustomMapContainer"

export default function ReviewsViewMap() {
  const [centerPosition, setCenterPosition] = React.useState(DefaultCenter)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCenterPosition([pos.coords.latitude, pos.coords.longitude])
      })
    }
  }, [])

  return (
    <CustomMapContainer
      mapSettings={ReviewsMapContainerSettings}
      center={centerPosition}
    >
      <Marker position={centerPosition} icon={MyPositionIcon} draggable={true}>
        <Popup>I am here.</Popup>
      </Marker>
    </CustomMapContainer>
  )
}
