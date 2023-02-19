import React from "react"
import AddNewReviewButton from "./AddNewReviewButton"
import ReviewsViewListDisplay from "./ReviewsViewListDisplay"

export default function ReviewsViewList(props) {
  return (
    <div>
      <AddNewReviewButton showModalWithReview={props.showModalWithReview} />
      <ReviewsViewListDisplay
        reviews={props.reviews}
        showModalWithReview={props.showModalWithReview}
      />
    </div>
  )
}
