import React from "react"
import {
  validationRules,
  validate,
  ErrorSpan,
} from "../Common/inputFieldValidation"

import { Login } from "../Common/LoginLogout"
import { AppSite } from "../Common/AppSite"

const loginFormFieldValidationRules = {
  username: {
    rules: [validationRules.NON_EMPTY],
    message: "username cannot be blank.",
  },
  password: {
    rules: [validationRules.NON_EMPTY],
    message: "password cannot be blank.",
  },
}

const urlLogin = AppSite + "auth/authenticate"

export default function LoginForm() {
  const [error, setError] = React.useState({})

  const formRef = React.useRef()

  function submitLoginForm(e) {
    e.preventDefault()

    const formData = new FormData(formRef.current)
    const formValues = Object.fromEntries(formData.entries())
    console.log(formValues)

    const validationError = validate(formValues, loginFormFieldValidationRules)
    setError(validationError)

    if (Object.keys(validationError).length !== 0) return

    fetch(urlLogin, {
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

        Login(json.token)
      })
  }
  return (
    <form ref={formRef}>
      <p style={{ textAlign: "center", color: "blue" }}>Login</p>
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
              <span>password:</span>
            </td>
            <td>
              <input type="password" name="password" />
              <ErrorSpan error={error.password} />
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        <input type="submit" onClick={submitLoginForm} value="Submit" />
      </p>
    </form>
  )
}
