export function LatLngToLocationStr(lat, lng) {
  return lat + "," + lng
}

export function LocationStrToLatLng(locationStr) {
  const splitted = locationStr.split(",")
  return {
    lat: splitted[0],
    lng: splitted[1],
  }
}
