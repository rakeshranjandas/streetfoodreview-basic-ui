import React from "react"
import { ReviewsViewTypes } from "./ReviewsViewTypes"

export default function ChooseReviewsView(props) {
  function changeReviewsView(e) {
    props.setCurrentView(e.target.value)
  }

  return (
    <div>
      <ul>
        {Object.keys(ReviewsViewTypes).map((x) => {
          const viewName = ReviewsViewTypes[x]
          return (
            <li key={viewName}>
              <label>
                {viewName}
                <input
                  type="radio"
                  name="reviews-view-choose"
                  value={viewName}
                  checked={props.currentView === viewName}
                  onChange={changeReviewsView}
                />
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
