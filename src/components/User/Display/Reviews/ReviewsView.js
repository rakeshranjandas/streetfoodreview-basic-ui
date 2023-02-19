import React from "react"
import { ReviewsViewTypes } from "./ReviewsViewTypes"
import ReviewsViewList from "./ReviewsViewList"
import ReviewsViewMap from "./ReviewsViewMap"

export default function ReviewsView(props) {
  return (
    <div>
      {props.currentView === ReviewsViewTypes.LIST && (
        <ReviewsViewList
          reviews={props.reviews}
          showModalWithReview={props.showModalWithReview}
        />
      )}
      {props.currentView === ReviewsViewTypes.MAP && (
        <ReviewsViewMap reviews={props.reviews} />
      )}
    </div>
  )
}
