import React from "react"
import AddShopModal from "./AddShopModal"
import {
  validationRules,
  validate,
  ErrorSpan,
} from "../../../../Common/inputFieldValidation"

const formFieldValidationRules = {
  shopId: {
    rules: [validationRules.NON_ZERO],
    message: "Please select a shop.",
  },
}

const urlAddEditReview = `http://localhost:8081/v1/user/review`

export default function AddEditReviewForm(props) {
  const review = props.currentReviewAddEdit

  const [currentShop, setCurrentShop] = React.useState(review.shopId ?? 0)
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

    const postFormValues = { ...formValues, id: review.id }

    fetch(urlAddEditReview, {
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
          <button
            type="button"
            style={{ marginLeft: "10px" }}
            onClick={() => setShowAddShopModal(true)}
          >
            Add New Shop
          </button>
          <ErrorSpan error={error.shopId} />
        </p>

        <p>
          <label for="rating">Rating:</label>
          <select id="rating" name="rating" defaultValue={review.rating ?? 0}>
            {[0, 1, 2, 3, 4, 5].map((x) => {
              return <option value={x}>{x}</option>
            })}
          </select>
        </p>

        <p>
          <label for="description">Description:</label>
          <br />
          <textarea
            id="description"
            name="description"
            rows="8"
            cols="30"
            defaultValue={review.description ?? ""}
          />
        </p>

        <p>
          <button type="button" onClick={doSubmit}>
            Add Review
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
