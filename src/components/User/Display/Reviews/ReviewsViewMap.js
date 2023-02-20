import React from "react"
import "leaflet/dist/leaflet.css"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import {
  MyPositionIcon,
  TileLayerSettings,
  ReviewsMapContainerSettings,
} from "./ReviewsViewMapSettings"

export default function ReviewsViewMap() {
  const [centerPosition, setCenterPosition] = React.useState([
    20.296059, 85.824539,
  ])

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCenterPosition([pos.coords.latitude, pos.coords.longitude])
      })
    }
  }, [])

  return (
    <MapContainer center={centerPosition} {...ReviewsMapContainerSettings}>
      <TileLayer {...TileLayerSettings} />
      <CenterMapContainerOnLoad center={centerPosition} />
      <Marker position={centerPosition} icon={MyPositionIcon}>
        <Popup>I am here.</Popup>
      </Marker>
    </MapContainer>
  )
}

function CenterMapContainerOnLoad(props) {
  const map = useMap()
  map.setView(props.center)
}
