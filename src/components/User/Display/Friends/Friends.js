import React from "react"
import FriendCard from "./FriendCard"

const urlFetchFriends = "http://localhost:8081/v1/user/1/friends"

export default function Friends() {
  const [friendList, setFriendList] = React.useState([])

  React.useEffect(() => {
    fetch(urlFetchFriends)
      .then((res) => res.json())
      .then((json) => {
        // console.log(friendList)
        setFriendList(json)
      })
  }, [])

  return (
    <div>
      {friendList.map((x) => {
        return <FriendCard key={x.id} data={x} />
      })}
    </div>
  )
}