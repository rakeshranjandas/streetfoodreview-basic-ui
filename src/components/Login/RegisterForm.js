import React from "react"

export default function RegisterForm() {
  return (
    <div>
      <p style={{ textAlign: "center", color: "blue" }}>Register</p>
      <table>
        <tbody>
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
        </tbody>
      </table>

      <p>
        <button>Submit</button>
      </p>
    </div>
  )
}
