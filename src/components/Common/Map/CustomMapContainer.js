import React from "react"
import "leaflet/dist/leaflet.css"

import { MapContainer, TileLayer, useMap } from "react-leaflet"

import { TileLayerSettings } from "./MapSettings"

export default function CustomMapContainer(props) {
  return (
    <MapContainer center={props.center} {...props.mapSettings}>
      <TileLayer {...TileLayerSettings} />
      <CenterMapContainerOnLoad center={props.center} />
      {props.children}
    </MapContainer>
  )
}

function CenterMapContainerOnLoad(props) {
  const map = useMap()
  map.setView(props.center)

  return null
}
