export default function Logout() {
  localStorage.removeItem("access_token")
  window.location = window.location.origin
}
