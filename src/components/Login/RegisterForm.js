import React from "react"
import {
  validationRules,
  validate,
  ErrorSpan,
} from "../Common/inputFieldValidation"

import { AppSite } from "../Common/AppSite"

const registerFormFieldValidationRules = {
  username: {
    rules: [validationRules.NON_EMPTY],
    message: "username cannot be blank.",
  },
  email: {
    rules: [validationRules.NON_EMPTY],
    message: "email cannot be blank.",
  },
  password: {
    rules: [validationRules.NON_EMPTY],
    message: "password cannot be blank.",
  },
}

const urlRegister = AppSite + "auth/register"

export default function RegisterForm() {
  const [error, setError] = React.useState({})

  const formRef = React.useRef()

  function submitRegisterForm(e) {
    e.preventDefault()

    const formData = new FormData(formRef.current)
    const formValues = Object.fromEntries(formData.entries())

    const validationError = validate(
      formValues,
      registerFormFieldValidationRules
    )

    if (formValues.password !== formValues.confirm_password) {
      validationError["confirm_password"] = "passwords do not match."
    }

    setError(validationError)

    if (Object.keys(validationError).length !== 0) return

    fetch(urlRegister, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error === "Forbidden") {
          alert("Bad Login")
          return
        }

        localStorage.setItem("access_token", json.token)
        window.location.reload()
      })
  }

  return (
    <form ref={formRef}>
      <p style={{ textAlign: "center", color: "blue" }}>Register</p>
      <table>
        <tbody>
          <tr>
            <td>
              <span>username:</span>
            </td>
            <td>
              <input type="text" name="username" />
              <ErrorSpan error={error.username} />
            </td>
          </tr>

          <tr>
            <td>
              <span>email:</span>
            </td>
            <td>
              <input type="text" name="email" />
              <ErrorSpan error={error.email} />
            </td>
          </tr>

          <tr>
            <td>
              <span>password:</span>
            </td>
            <td>
              <input type="password" name="password" />
              <ErrorSpan error={error.password} />
            </td>
          </tr>

          <tr>
            <td>
              <span>confirm password:</span>
            </td>
            <td>
              <input type="password" name="confirm_password" />
              <ErrorSpan error={error.confirm_password} />
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        <input type="submit" onClick={submitRegisterForm} value="Submit" />
      </p>
    </form>
  )
}
