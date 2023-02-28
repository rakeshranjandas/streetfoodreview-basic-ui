import React from "react"

const styles = {
  display: "flex",
  gap: "50px",
  border: "1px solid",
  margin: "10px",
  padding: "10px",
}

export default function ReviewsViewListDisplayCard(props) {
  const review = props.review

  return (
    <div style={styles}>
      {!props.hideShopName && <p>{review.shop.name}</p>}

      <p>
        <StarRating rating={review.rating} />
      </p>
      <p>{review.description}</p>

      {!props.hideEdit && (
        <p style={{ marginLeft: "auto" }}>
          <button onClick={() => props.showModalWithReview({ ...review })}>
            Edit
          </button>
        </p>
      )}
    </div>
  )
}

function StarRating(props) {
  return (
    <>
      {new Array(parseInt(props.rating)).fill(0).map((x) => {
        return <span style={{ color: "red" }}>&#9733;</span>
      })}
      {new Array(parseInt(5 - props.rating)).fill(0).map((x) => {
        return <span>&#9734;</span>
      })}
    </>
  )
}
