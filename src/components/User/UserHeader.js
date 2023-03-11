import React from "react"
import profilePic from "../../assets/profile_generic.jpeg"
import AppFetch from "../Common/AppFetch"

const styles = {
  listStyle: "none",
  display: "flex",
  alignItems: "center",
}

const imgStyle = {
  height: "100px",
  width: "100px",
}
const urlGetUserName = "user/0"

export default function UserHeader() {
  const [username, setUsername] = React.useState("")

  React.useEffect(() => {
    AppFetch(urlGetUserName)
      .then((res) => res.json())
      .then((json) => {
        setUsername(json.name)
      })
  }, [])

  return (
    <div>
      <ul style={styles}>
        <li>
          <p>
            <span style={{ textAlign: "center", color: "brown" }}>
              {username}
            </span>
          </p>

          <img src={profilePic} style={imgStyle} alt="user-profile-pic" />
        </li>
        <li>
          <input type="text" />
        </li>
      </ul>
    </div>
  )
}
