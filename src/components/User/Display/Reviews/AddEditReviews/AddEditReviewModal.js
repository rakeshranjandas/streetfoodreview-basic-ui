import React from "react"
import AddEditReviewForm from "./AddEditReviewForm"

const modalStyles = {
  position: "fixed",
  zIndex: 1,
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
  width: "30%",
}

const closeStyles = {
  fontSize: "20px",
  fontWeight: "bold",
  float: "right",
  border: "1px solid",
  padding: "1px",
  cursor: "pointer",
}

export default function AddEditReviewModal(props) {
  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <span style={closeStyles} onClick={() => props.closeModal()}>
          &times;
        </span>
        <AddEditReviewForm
          currentReviewAddEdit={props.currentReviewAddEdit}
          setCurrentReviewAddEdit={props.setCurrentReviewAddEdit}
          closeModal={props.closeModal}
          shops={props.shops}
          addNewShop={props.addNewShop}
          updateReviews={props.updateReviews}
        />
      </div>
    </div>
  )
}
