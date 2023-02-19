import React from "react"
import { UserDisplayViewTypes } from "./UserDisplayViewTypes"
import ChooseUserDisplayView from "./ChooseUserDisplayView"
import UserDisplayView from "./UserDisplayView"

export default function UserDisplayArea() {
  const [currentView, setCurrentView] = React.useState(
    UserDisplayViewTypes.REVIEWS.name
  )

  return (
    <div>
      <ChooseUserDisplayView
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <UserDisplayView currentView={currentView} />
    </div>
  )
}
