import React from "react"
import ReviewsViewListDisplayCard from "./ReviewsViewListDisplayCard"

export default function ReviewsViewListDisplay(props) {
  return (
    <div>
      {props.reviews.map((x) => {
        return (
          <ReviewsViewListDisplayCard
            review={x}
            showModalWithReview={props.showModalWithReview}
          />
        )
      })}
    </div>
  )
}
