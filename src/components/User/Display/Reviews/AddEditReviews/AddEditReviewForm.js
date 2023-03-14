import React from "react"
import AddShopModal from "./AddShopModal"
import {
  validationRules,
  validate,
  ErrorSpan,
} from "../../../../Common/inputFieldValidation"
import AppFetch from "../../../../Common/AppFetch"

const formFieldValidationRules = {
  shopId: {
    rules: [validationRules.NON_ZERO],
    message: "Please select a shop.",
  },
}

const urlAddEditReview = `user/review`

export default function AddEditReviewForm(props) {
  const review = props.currentReviewAddEdit

  const [currentShop, setCurrentShop] = React.useState(
    review ? review.shopId : 0
  )
  const [showAddShopModal, setShowAddShopModal] = React.useState(false)
  const [error, setError] = React.useState({})

  function changeShop(e) {
    setError({ ...error, shopId: "" })
    setCurrentShop(e.target.value)
  }

  const form = React.useRef()
  function doSubmit(e) {
    const formData = new FormData(form.current)
    const formValues = Object.fromEntries(formData.entries())

    const validationError = validate(formValues, formFieldValidationRules)
    setError(validationError)

    if (Object.keys(validationError).length !== 0) return

    const postFormValues = { ...formValues }
    if (review) postFormValues.id = review.id

    AppFetch(urlAddEditReview, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postFormValues),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("review", res)
        props.updateReviews(res)
        props.closeModal()
      })
  }

  return (
    <div>
      {showAddShopModal && (
        <AddShopModal
          setCurrentShop={setCurrentShop}
          addNewShop={props.addNewShop}
          setShowAddShopModal={setShowAddShopModal}
        />
      )}
      <form ref={form}>
        <p>
          {props.shop ? (
            <input type="hidden" name="shopId" value={props.shop.id} />
          ) : (
            <span>
              <label for="shopId">Shop:</label>
              <select
                id="shopId"
                name="shopId"
                value={currentShop}
                onChange={changeShop}
              >
                <option value="0">Select</option>
                {props.shops.map((x) => {
                  return <option value={x.id}>{x.name}</option>
                })}
              </select>
            </span>
          )}

          {!props.shop && (
            <button
              type="button"
              style={{ marginLeft: "10px" }}
              onClick={() => setShowAddShopModal(true)}
            >
              Add New Shop
            </button>
          )}

          <ErrorSpan error={error.shopId} />
        </p>

        <p>
          <StarRatingChoose rating={review ? review.rating : 0} />
        </p>

        <p>
          <label for="description">Description:</label>
          <br />
          <textarea
            id="description"
            name="description"
            rows="8"
            cols="30"
            defaultValue={review ? review.description : ""}
          />
        </p>

        <p>
          <button type="button" onClick={doSubmit}>
            {review ? "Update Review" : "Add Review"}
          </button>
          <button
            type="button"
            style={{ marginLeft: "10px" }}
            onClick={() => props.closeModal()}
          >
            Cancel
          </button>
        </p>
      </form>
    </div>
  )
}

function StarRatingChoose(props) {
  const [rating, setRating] = React.useState(props.rating ?? 0)

  function changeRating(newRating) {
    setRating(newRating)
  }

  return (
    <>
      <label for="rating">Rating:</label>
      <input type="hidden" name="rating" value={rating} />
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          changeRating(0)
        }}
      >
        x
      </span>
      {new Array(5).fill(0).map((x, idx) => {
        return idx < rating ? (
          <span
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => {
              changeRating(idx + 1)
            }}
          >
            &#9733;
          </span>
        ) : (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              changeRating(idx + 1)
            }}
          >
            &#9734;
          </span>
        )
      })}
    </>
  )
}
