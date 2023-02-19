import React from "react"
import { UserDisplayViewTypes } from "./UserDisplayViewTypes"
import Friends from "./Display/Friends/Friends"
import Reviews from "./Display/Reviews/Reviews"

export default function UserDisplayView(props) {
  return (
    <div>
      {props.currentView === UserDisplayViewTypes.REVIEWS.name && <Reviews />}
      {props.currentView === UserDisplayViewTypes.FRIENDS.name && <Friends />}
    </div>
  )
}
