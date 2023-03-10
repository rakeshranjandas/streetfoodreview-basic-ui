import "./App.css"
import React from "react"
import User from "./components/User/User"
import Login from "./components/Login/Login"

const styles = {
  padding: "0px 100px",
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  return <div style={styles}>{isAuthenticated ? <User /> : <Login />}</div>
}
