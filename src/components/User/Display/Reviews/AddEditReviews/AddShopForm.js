import React from "react"
import {
  validationRules,
  validate,
  ErrorSpan,
} from "../../../../Common/inputFieldValidation"

const formFieldValidationRules = {
  location: {
    rules: ["NON_EMPTY"],
    message: "Location cannot be blank.",
  },
  name: {
    rules: ["NON_EMPTY"],
    message: "Name cannot be blank.",
  },
}

const urlAddShop = `http://localhost:8081/v1/shop`

export default function AddShopForm(props) {
  const [error, setError] = React.useState({})

  const form = React.useRef()

  function doSubmit() {
    const formData = new FormData(form.current)
    const formValues = Object.fromEntries(formData.entries())

    const validationError = validate(formValues, formFieldValidationRules)
    setError(validationError)

    if (Object.keys(validationError).length !== 0) return

    fetch(urlAddShop, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => res.json())
      .then((json) => {
        props.addNewShop(json)
        !!props.setCurrentShop && props.setCurrentShop(json.id)
        !!props.closeModal && props.closeModal()
      })
  }

  return (
    <form ref={form}>
      <p>
        <label for="location">Location:</label>
        <span style={{ color: "blue", fontSize: "0.8em" }}>
          {props.location}
        </span>
        <input
          type="hidden"
          name="location"
          id="location"
          value={props.location}
        />
        <ErrorSpan error={error.location} />
      </p>
      <p>
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" style={{ width: "80%" }} />
        <ErrorSpan error={error.name} />
      </p>
      <p>
        <button type="button" onClick={doSubmit}>
          Add Shop
        </button>
        <button
          type="button"
          onClick={props.closeModal}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </p>
    </form>
  )
}