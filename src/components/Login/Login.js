import React from "react"

export default function Login() {
  const [isLoginOrRegister, setIsLoginOrRegister] = React.useState("login")

  return (
    <div>
      <p>
        <ul style={{ listStyle: "none", display: "flex", gap: "21px" }}>
          <li>
            <label>
              <input
                type="radio"
                name="loginorregister"
                checked={isLoginOrRegister === "login"}
                onClick={() => setIsLoginOrRegister("login")}
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
                onClick={() => setIsLoginOrRegister("register")}
              />{" "}
              Register
            </label>
          </li>
        </ul>
      </p>

      <div
        style={{ border: "1px solid", width: "fit-content", padding: "12px" }}
      >
        {isLoginOrRegister === "login" && <LoginForm />}
        {isLoginOrRegister === "register" && <RegisterForm />}
      </div>
    </div>
  )
}

function LoginForm() {
  return (
    <div>
      <p style={{ textAlign: "center", color: "blue" }}>Login</p>
      <table>
        <tr>
          <td>
            <span>username:</span>
          </td>
          <td>
            <input type="text" />
          </td>
        </tr>

        <tr>
          <td>
            <span>password:</span>
          </td>
          <td>
            <input type="password" />
          </td>
        </tr>
      </table>

      <p>
        <button>Submit</button>
      </p>
    </div>
  )
}

function RegisterForm() {
  return (
    <div>
      <p style={{ textAlign: "center", color: "blue" }}>Register</p>
      <table>
        <tr>
          <td>
            <span>username:</span>
          </td>
          <td>
            <input type="text" />
          </td>
        </tr>

        <tr>
          <td>
            <span>email:</span>
          </td>
          <td>
            <input type="text" />
          </td>
        </tr>

        <tr>
          <td>
            <span>password:</span>
          </td>
          <td>
            <input type="password" />
          </td>
        </tr>

        <tr>
          <td>
            <span>confirm password:</span>
          </td>
          <td>
            <input type="password" />
          </td>
        </tr>
      </table>

      <p>
        <button>Submit</button>
      </p>
    </div>
  )
}
