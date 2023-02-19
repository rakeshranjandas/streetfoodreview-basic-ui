import React from "react"
import { UserDisplayViewTypes } from "./UserDisplayViewTypes"

const styles = {
  listStyle: "none",
  display: "flex",
  gap: "20px",
}

export default function ChooseUserDisplayView(props) {
  function changeDisplayView(e) {
    props.setCurrentView(e.target.value)
  }

  return (
    <div>
      <ul style={styles}>
        {Object.keys(UserDisplayViewTypes).map((x) => {
          return (
            <li key={UserDisplayViewTypes[x].name}>
              <label>
                <input
                  type="radio"
                  name="user-display-view-choose"
                  checked={props.currentView === UserDisplayViewTypes[x].name}
                  value={UserDisplayViewTypes[x].name}
                  onChange={changeDisplayView}
                />
                {UserDisplayViewTypes[x].label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
