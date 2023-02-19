import React from "react"

const styles = {
  display: "flex",
  gap: "50px",
  border: "1px solid",
  margin: "10px",
  width: "500px",
  padding: "10px",
}

const getUrlAddFriend = (id) => {
  return `http://localhost:8081/v1/user/1/friend/${id}?type=follow`
}

const getUrlRemoveFriend = (id) => {
  return `http://localhost:8081/v1/user/1/friend/${id}?type=unfollow`
}

export default function FriendCard(props) {
  const [isFriend, setIsFriend] = React.useState(true)

  function beFriend() {
    fetch(getUrlAddFriend(props.data.id), { method: "PUT" }).then(() =>
      setIsFriend(true)
    )
  }

  function unFriend() {
    fetch(getUrlRemoveFriend(props.data.id), { method: "PUT" }).then(() =>
      setIsFriend(false)
    )
  }

  return (
    <div style={styles}>
      <p>{props.data.name}</p>
      <p>{props.data.email}</p>

      <p>
        {isFriend ? (
          <button onClick={unFriend}>Remove</button>
        ) : (
          <button
            onClick={beFriend}
            style={{ backgroundColor: "blue", color: "white" }}
          >
            Add
          </button>
        )}
      </p>
    </div>
  )
}
