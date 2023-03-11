import { Logout } from "./LoginLogout"
import { AppSite } from "./AppSite"

export default function AppFetch(...params) {
  const url = AppSite + params[0]
  const options = params[1] ? { ...params[1] } : { headers: {} }
  const token = localStorage.getItem("access_token")

  if (token === null) {
    Logout()
    return null
  }

  options.headers.Authorization = "Bearer " + token

  return fetch(url, options).then((respone) => {
    if (respone.status === 403) {
      Logout()
      return null
    }
    return respone
  })
}
