import React from "react"
import { ReviewsViewTypes } from "./ReviewsViewTypes"
import ChooseReviewsView from "./ChooseReviewsView"
import ReviewsView from "./ReviewsView"
import AddEditReviewModal from "./AddEditReviews/AddEditReviewModal"
import AppFetch from "../../../Common/AppFetch"

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
    addToReviews(review)
    addToShop(review)
  }

  function addToReviews(review) {
    const newReviews = [...reviews]
    const index = newReviews.findIndex((x) => x.id === review.id)

    if (index === -1) newReviews.unshift(review)
    else newReviews[index] = review

    setReviews(newReviews)
  }

  function addToShop(review) {
    const newShops = [...shops]
    const index = newShops.findIndex((x) => x.id === review.shopId)

    const shopReviews = newShops[index].reviews
      ? [...newShops[index].reviews]
      : []
    shopReviews.push(review)

    newShops[index].reviews = shopReviews

    setShops(newShops)
  }

  React.useEffect(() => {
    AppFetch(urlReviews)
      .then((res) => res.json())
      .then((json) => {
        console.log("Reviews", json)
        setReviews(json)
      })

    AppFetch(urlShops)
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
        shops={shops}
        addNewShop={addNewShop}
        updateReviews={updateReviews}
      />
    </div>
  )
}
