import React from "react"

export default function AddNewReviewButton(props) {
  return (
    <div>
      <button onClick={() => props.showModalWithReview({})}>
        Add New Review
      </button>
    </div>
  )
}
