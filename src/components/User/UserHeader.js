import React from "react"
import profilePic from "../../assets/profile_generic.jpeg"

const styles = {
  listStyle: "none",
  display: "flex",
  alignItems: "center",
}

const imgStyle = {
  height: "100px",
  width: "100px",
}

export default function UserHeader() {
  return (
    <div>
      <ul style={styles}>
        <li>
          <img src={profilePic} style={imgStyle} alt="user-profile-pic" />
        </li>
        <li>
          <input type="text" />
        </li>
      </ul>
    </div>
  )
}
