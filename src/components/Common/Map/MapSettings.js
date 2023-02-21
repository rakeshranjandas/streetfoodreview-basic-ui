import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from "leaflet"

export const DefaultCenter = [20.296059, 85.824539]

export const MyPositionIcon = new Icon({
  iconUrl: markerIconPng,
  iconSize: [20, 32],
  className: "my-position-map-marker",
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
  zoom: 15,
  scrollWheelZoom: true,
  className: "choose-shop-map",
}