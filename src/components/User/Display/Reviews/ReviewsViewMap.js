import React from "react"

import { Marker, useMapEvents } from "react-leaflet"

import {
  DefaultCenter,
  PinPositionIcon,
  ShopIcon,
  ReviewsMapContainerSettings,
} from "../../../Common/Map/MapSettings"

import CustomMapContainer from "../../../Common/Map/CustomMapContainer"
import { LocationStrToLatLng } from "../../../Common/MapLocationConvert"
import AddShopForm from "./AddEditReviews/AddShopForm"
import AddEditReviewForm from "./AddEditReviews/AddEditReviewForm"
import ReviewsViewListDisplayCard from "./ReviewsViewListDisplayCard"

import { LatLngToLocationStr } from "../../../Common/MapLocationConvert"

export default function ReviewsViewMap(props) {
  const [centerPosition, setCenterPosition] = React.useState(DefaultCenter)
  const [addShopMarkerLocation, setAddShopMarkerLocation] =
    React.useState(centerPosition)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const newPos = [pos.coords.latitude, pos.coords.longitude]
        moveShopMarkerLocationAndRecenter(newPos)
      })
    }
  }, [])

  const markerRef = React.useRef()
  function moveShopMarkerLocationAndRecenter(newPosArr) {
    setAddShopMarkerLocation(newPosArr)
    setCenterPosition(newPosArr)
  }

  const [showMapOverlay, setShowMapOverlay] = React.useState(false)
  const [overlayView, setOverlayView] = React.useState("add_shop")
  const [overlayAddShopPosition, setOverlayAddShopPosition] = React.useState("")
  const [overlayShowShop, setOverlayShowShop] = React.useState({})

  function closeOverlay() {
    setShowMapOverlay(false)
  }

  function showAddShopInOverlay() {
    setOverlayView("add_shop")
    setShowMapOverlay(true)
  }

  function showAddReviewInOverlay() {
    setOverlayView("add_review")
    setShowMapOverlay(true)
  }

  return (
    <div style={{ position: "absolute" }}>
      <ReviewsViewMapOverlay
        showMapOverlay={showMapOverlay}
        setShowMapOverlay={setShowMapOverlay}
        overlayView={overlayView}
        overlayAddShopPosition={overlayAddShopPosition}
        overlayShowShop={overlayShowShop}
        shops={props.shops}
        addNewShop={props.addNewShop}
        updateReviews={props.updateReviews}
      />

      <CustomMapContainer
        mapSettings={ReviewsMapContainerSettings}
        center={centerPosition}
      >
        <ClickLayer
          moveShopMarkerLocationAndRecenter={moveShopMarkerLocationAndRecenter}
          closeOverlay={closeOverlay}
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
              closeOverlay()
            },
            click: () => {
              const markerPosLatLng = markerRef.current._latlng
              const newPosArr = [markerPosLatLng.lat, markerPosLatLng.lng]
              showAddShopInOverlay()
              setOverlayAddShopPosition(newPosArr)
            },
          }}
        />

        {props.shops.map((shop) => {
          return (
            <ShopMarker
              shop={shop}
              showAddReviewInOverlay={showAddReviewInOverlay}
              setCenterPosition={setCenterPosition}
              setOverlayShowShop={setOverlayShowShop}
            />
          )
        })}
      </CustomMapContainer>
    </div>
  )
}

function ShopMarker(props) {
  const locationObj = LocationStrToLatLng(props.shop.location)
  const shopPosArr = [locationObj.lat, locationObj.lng]

  return (
    <Marker
      position={shopPosArr}
      icon={ShopIcon}
      eventHandlers={{
        click: (e) => {
          props.setCenterPosition(shopPosArr)
          props.showAddReviewInOverlay()
          props.setOverlayShowShop(props.shop)
        },
      }}
    ></Marker>
  )
}

function ClickLayer(props) {
  useMapEvents({
    click: function (e) {
      let newPosArr = [e.latlng.lat, e.latlng.lng]
      props.moveShopMarkerLocationAndRecenter(newPosArr)
      props.closeOverlay()
    },
  })
}

function ReviewsViewMapOverlay(props) {
  const overlayStyles = {
    backgroundColor: "grey",
    width: props.showMapOverlay ? "40%" : "0%",
    height: "100%",
    position: "absolute",
    zIndex: 10000,
    right: 0,
    border: "1px solid",
    transition: "width 1s",
  }

  const innerDivStyles = {
    backgroundColor: "white",
    opacity: props.showMapOverlay ? 1 : 0,
    position: "absolute",
    width: "100%",
    transition: "all 1s",
  }

  function closeOverlay() {
    props.setShowMapOverlay(false)
  }

  return (
    <div style={overlayStyles}>
      <div style={innerDivStyles}>
        <button
          style={{ float: "right", border: "none", cursor: "pointer" }}
          onClick={closeOverlay}
        >
          X
        </button>
        {props.overlayView === "add_shop" && (
          <AddShopForm
            location={LatLngToLocationStr(
              props.overlayAddShopPosition[0],
              props.overlayAddShopPosition[1]
            )}
            addNewShop={props.addNewShop}
            closeFormAction={closeOverlay}
          />
        )}
        {props.overlayView === "add_review" && (
          <ShopReviewsInPopup
            shops={props.shop}
            shop={props.overlayShowShop}
            updateReviews={props.updateReviews}
          />
        )}
      </div>
    </div>
  )
}

function ShopReviewsInPopup(props) {
  const [showAddEditReviewForm, setShowAddEditReviewForm] =
    React.useState(false)

  function hideAddEditReviewForm() {
    setShowAddEditReviewForm(false)
  }

  React.useEffect(
    function () {
      hideAddEditReviewForm()
    },
    [props.shop]
  )

  return (
    <>
      {showAddEditReviewForm ? (
        <AddEditReviewForm
          shops={props.shops}
          shop={props.shop}
          closeModal={hideAddEditReviewForm}
          updateReviews={props.updateReviews}
        />
      ) : (
        <button
          onClick={() => {
            setShowAddEditReviewForm(true)
          }}
        >
          Add New Review
        </button>
      )}

      <ShopRatings reviews={props.shop.reviews} />
    </>
  )
}

function ShopRatings(props) {
  return (
    <>
      {props.reviews.map((review) => {
        return (
          <ReviewsViewListDisplayCard
            review={review}
            hideShopName={true}
            hideEdit={true}
          />
        )
      })}
    </>
  )
}
