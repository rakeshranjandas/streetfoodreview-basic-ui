import React from "react"
import { ReviewsViewTypes } from "./ReviewsViewTypes"
import ChooseReviewsView from "./ChooseReviewsView"
import ReviewsView from "./ReviewsView"
import AddEditReviewModal from "./AddEditReviews/AddEditReviewModal"

const urlReviews = "http://localhost:8081/v1/user/1/reviews"
const urlShops = "http://localhost:8081/v1/shop"

export default function Reviews() {
  const [reviews, setReviews] = React.useState([])
  const [shops, setShops] = React.useState([])
  const [currentView, setCurrentView] = React.useState(ReviewsViewTypes.LIST)
  const [showAddEditModal, setShowAddEditModal] = React.useState(false)
  const [currentReviewAddEdit, setCurrentReviewAddEdit] = React.useState({})

  function showModalWithReview(review) {
    setShowAddEditModal(true)
    setCurrentReviewAddEdit(review)
  }

  function closeModal() {
    setShowAddEditModal(false)
  }

  function addNewShop(newShop) {
    console.log(shops, newShop)

    setShops((prevShops) => {
      return [...prevShops, newShop]
    })
  }

  function updateReviews(review) {
    const newReviews = [...reviews]
    console.log("r", reviews)
    const index = newReviews.findIndex((x) => x.id === review.id)

    if (index === -1) newReviews.unshift(review)
    else newReviews[index] = review

    setReviews(newReviews)
  }

  React.useEffect(() => {
    fetch(urlReviews)
      .then((res) => res.json())
      .then((json) => {
        console.log("Reviews", json)
        setReviews(json)
      })

    fetch(urlShops)
      .then((res) => res.json())
      .then((json) => {
        console.log("Shops", json)
        setShops(json)
      })
  }, [])

  return (
    <div>
      <ChooseReviewsView
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {showAddEditModal && (
        <AddEditReviewModal
          currentReviewAddEdit={currentReviewAddEdit}
          setCurrentReviewAddEdit={setCurrentReviewAddEdit}
          closeModal={closeModal}
          shops={shops}
          addNewShop={addNewShop}
          updateReviews={updateReviews}
        />
      )}

      <ReviewsView
        currentView={currentView}
        reviews={reviews}
        showModalWithReview={showModalWithReview}
      />
    </div>
  )
}
