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

  const popupElRef = React.useRef()
  function closePopup() {
    popupElRef.current._closeButton.click()
  }

  const markerRef = React.useRef()
  function moveShopMarkerLocationAndRecenter(newPosArr) {
    setAddShopMarkerLocation(newPosArr)
    setCenterPosition(newPosArr)
  }

  return (
    <CustomMapContainer
      mapSettings={ReviewsMapContainerSettings}
      center={centerPosition}
    >
      <ClickLayer
        moveShopMarkerLocationAndRecenter={moveShopMarkerLocationAndRecenter}
      />

      <Marker
        ref={markerRef}
        position={addShopMarkerLocation}
        icon={PinPositionIcon}
        draggable={true}
        eventHandlers={{
          dragend: () => {
            const markerPosLatLng = markerRef.current._latlng
            const newPosArr = [markerPosLatLng.lat, markerPosLatLng.lng]
            moveShopMarkerLocationAndRecenter(newPosArr)
          },
        }}
      >
        <Popup ref={popupElRef}>
          <AddShopForm
            location={addShopMarkerLocation}
            addNewShop={props.addNewShop}
            closeModal={closePopup}
          />
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
  const [dynamicContent, setDynamicContent] = React.useState("hasds")

  return (
    <Marker position={[locationObj.lat, locationObj.lng]} icon={ShopIcon}>
      <Popup maxWidth="auto">
        <p
          onClick={(e) => {
            const dynamicContent = e.target.innerText + " More "
            setDynamicContent(dynamicContent)
          }}
        >
          {dynamicContent}
        </p>
      </Popup>
    </Marker>
  )
}

function ClickLayer(props) {
  useMapEvents({
    click: function (e) {
      let newPosArr = [e.latlng.lat, e.latlng.lng]
      props.moveShopMarkerLocationAndRecenter(newPosArr)
    },
  })
}
