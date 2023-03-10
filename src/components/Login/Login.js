import React from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default function Login() {
  const [isLoginOrRegister, setIsLoginOrRegister] = React.useState("login")

  return (
    <div>
      <ul style={{ listStyle: "none", display: "flex", gap: "21px" }}>
        <li>
          <label>
            <input
              type="radio"
              name="loginorregister"
              checked={isLoginOrRegister === "login"}
              onChange={() => setIsLoginOrRegister("login")}
            />
            Login
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="loginorregister"
              checked={isLoginOrRegister === "register"}
              onChange={() => setIsLoginOrRegister("register")}
            />{" "}
            Register
          </label>
        </li>
      </ul>

      <div
        style={{ border: "1px solid", width: "fit-content", padding: "12px" }}
      >
        {isLoginOrRegister === "login" && <LoginForm />}
        {isLoginOrRegister === "register" && <RegisterForm />}
      </div>
    </div>
  )
}
