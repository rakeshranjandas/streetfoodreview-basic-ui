import React from "react"

import { Marker } from "react-leaflet"

import {
  DefaultCenter,
  MyPositionIcon,
  ShopIcon,
  ReviewsMapContainerSettings,
} from "../../../Common/Map/MapSettings"

import CustomMapContainer from "../../../Common/Map/CustomMapContainer"
import AddNewShopClickableLayer from "./AddNewShopClickableLayer"
import { LocationStrToLatLng } from "../../../Common/MapLocationConvert"

export default function ReviewsViewMap(props) {
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
      <AddNewShopClickableLayer />
      <Marker position={centerPosition} icon={MyPositionIcon}></Marker>

      {props.shops.map((shop) => {
        return <ShopMarker shop={shop} />
      })}
    </CustomMapContainer>
  )
}

function ShopMarker(props) {
  const locationObj = LocationStrToLatLng(props.shop.location)

  return (
    <Marker
      position={[locationObj.lat, locationObj.lng]}
      icon={ShopIcon}
    ></Marker>
  )
}
