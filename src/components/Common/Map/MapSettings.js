import defaultMarkerIconPng from "leaflet/dist/images/marker-icon.png"
import shopMarkerIconPng from "../../../assets/shop-marker.png"

import { Icon } from "leaflet"

export const DefaultCenter = [20.296059, 85.824539]

export const MyPositionIcon = new Icon({
  iconUrl: defaultMarkerIconPng,
  iconSize: [20, 32],
  className: "my-position-map-marker",
})

export const ShopIcon = new Icon({
  iconUrl: shopMarkerIconPng,
  iconSize: [22, 32],
  className: "shop-map-marker",
})

export const PinPositionIcon = new Icon({
  iconUrl: defaultMarkerIconPng,
  iconSize: [20, 32],
})

export const TileLayerSettings = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
}

export const ReviewsMapContainerSettings = {
  zoom: 15,
  scrollWheelZoom: true,
  className: "reviews-view-map",
}

export const ChooseShopMapContainerSettings = {
  zoom: 20,
  scrollWheelZoom: true,
  className: "choose-shop-map",
}
