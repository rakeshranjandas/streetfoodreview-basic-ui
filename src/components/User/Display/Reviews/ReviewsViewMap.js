import React from "react"
import "leaflet/dist/leaflet.css"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from "leaflet"
const myIcon = new Icon({
  iconUrl: markerIconPng,
  iconSize: [20, 32],
})

export default function ReviewsViewMap() {
  const position = [51.505, -0.09]
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={myIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}
