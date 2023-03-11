import React from "react"
import UserHeader from "./UserHeader"
import UserDisplayArea from "./UserDisplayArea"
import Logout from "../Common/Logout"

export default function User() {
  return (
    <div>
      <p>
        <button style={{ float: "right" }} onClick={() => Logout()}>
          logout
        </button>
      </p>
      <UserHeader />
      <UserDisplayArea />
    </div>
  )
}
