import React from "react"
import {
  validationRules,
  validate,
  ErrorSpan,
} from "../../../../Common/inputFieldValidation"
import AddShopForm from "./AddShopForm"
import ChooseShopLocationMap from "./ChooseShopLocationMap"

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
  padding: "20px",
  border: "1px solid #888",
  width: "50%",
}

const closeStyles = {
  fontSize: "20px",
  fontWeight: "bold",
  float: "right",
  border: "1px solid",
  padding: "1px",
  cursor: "pointer",
}

export default function AddShopModal(props) {
  const [location, setLocation] = React.useState("")

  function closeModal() {
    props.setShowAddShopModal(false)
  }

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <span style={closeStyles} onClick={closeModal}>
          &times;
        </span>

        <ChooseShopLocationMap setLocation={setLocation} />

        <AddShopForm
          location={location}
          setCurrentShop={props.setCurrentShop}
          addNewShop={props.addNewShop}
          closeModal={closeModal}
        />
      </div>
    </div>
  )
}
