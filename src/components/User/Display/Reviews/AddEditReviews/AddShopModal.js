import React from "react"
import {
  validationRules,
  validate,
  ErrorSpan,
} from "../../../../Common/inputFieldValidation"

const modalStyles = {
  position: "fixed",
  zIndex: 2,
  paddingTop: "100px",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0,0,0,0.4)",
}

const modalContentStyles = {
  backgroundColor: "#fefefe",
  margin: "auto",
  marginTop: "10%",
  padding: "20px",
  border: "1px solid #888",
  width: "25%",
}

const closeStyles = {
  fontSize: "20px",
  fontWeight: "bold",
  float: "right",
  border: "1px solid",
  padding: "1px",
  cursor: "pointer",
}

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

export default function AddShopModal(props) {
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
        props.setCurrentShop(json.id)
        props.addNewShop(json)
        closeModal()
      })
  }

  function closeModal() {
    props.setShowAddShopModal(false)
  }

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <span style={closeStyles} onClick={closeModal}>
          &times;
        </span>

        <form ref={form}>
          <p>
            <label for="location">Location:</label>
            <input type="text" name="location" id="location" />
            <ErrorSpan error={error.location} />
          </p>
          <p>
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" />
            <ErrorSpan error={error.name} />
          </p>
          <p>
            <button type="button" onClick={doSubmit}>
              Add Shop
            </button>
            <button
              type="button"
              onClick={closeModal}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
