export function Logout() {
  localStorage.removeItem("access_token")
  window.location = window.location.origin
}

export function Login(token) {
  localStorage.setItem("access_token", token)
  window.location.reload()
}
