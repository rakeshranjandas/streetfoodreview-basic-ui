import React from "react"

import { Marker, Popup, useMapEvents } from "react-leaflet"

import {
  DefaultCenter,
  PinPositionIcon,
  ShopIcon,
  ReviewsMapContainerSettings,
} from "../../../Common/Map/MapSettings"

import CustomMapContainer from "../../../Common/Map/CustomMapContainer"
import { LocationStrToLatLng } from "../../../Common/MapLocationConvert"
import AddShopForm from "./AddEditReviews/AddShopForm"

export default function ReviewsViewMap(props) {
  const [centerPosition, setCenterPosition] = React.useState(DefaultCenter)
  const [addShopMarkerLocation, setAddShopMarkerLocation] =
    React.useState(centerPosition)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const newPos = [pos.coords.latitude, pos.coords.longitude]
        setCenterPosition(newPos)
        setAddShopMarkerLocation(newPos)
      })
    }
  }, [])

  return (
    <CustomMapContainer
      mapSettings={ReviewsMapContainerSettings}
      center={centerPosition}
    >
      <ClickLayer setAddShopMarkerLocation={setAddShopMarkerLocation} />

      <Marker
        position={addShopMarkerLocation}
        icon={PinPositionIcon}
        draggable={true}
      >
        <Popup>
          <AddShopForm />
        </Popup>
      </Marker>

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

function ClickLayer(props) {
  useMapEvents({
    click: function (e) {
      console.log(e.latlng)
      props.setAddShopMarkerLocation([e.latlng.lat, e.latlng.lng])
    },
  })
}
