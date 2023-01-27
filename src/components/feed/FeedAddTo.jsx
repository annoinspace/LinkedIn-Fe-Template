import { useEffect, useState } from "react"
import { ArrowRight, InfoSquareFill } from "react-bootstrap-icons"
import SideUser from "./Mini Components/SideUser"
import { useSelector } from "react-redux"

const FeedAddTo = () => {
  const allConnections = useSelector((state) => state.connections.allConnections)
  console.log("----------------------allConnections users", allConnections)

  const [users, setUsers] = useState([])
  const fetchAllUsers = async () => {
    try {
      const response = await fetch("https://linkedin-backend-production.up.railway.app/users/")
      if (response.ok) {
        const usersAll = await response.json()
        console.log("-------------------------------All users are here 2", usersAll)
        const users = usersAll.filter((user1) => !allConnections.some((user2) => user2._id === user1._id))
        setUsers(users)
      } else {
        console.log("Error fetching data")
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAllUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
  console.log(getRandomInt(users.length))

  return (
    <div
      className="bg-white"
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid lightgrey"
      }}
    >
      <div className="d-flex justify-content-between align-items-center p-feed-x">
        <div style={{ fontWeight: "500" }}>Add to your feed</div>
        <div className="d-flex justify-content-center align-items-center editButtonIconDiv ">
          <InfoSquareFill style={{ fontSize: "12px" }} className="chevronHover" />
        </div>
      </div>
      <SideUser {...users[getRandomInt(users.length)]} />
      <SideUser {...users[getRandomInt(users.length)]} />
      <SideUser {...users[getRandomInt(users.length)]} />
      <div className="d-flex p-feed-left py-2 align-items-center">
        <a href="/network">
          <div
            className="hoverGreyBg text-secondary"
            style={{
              fontSize: "12px",
              fontWeight: "500"
            }}
          >
            View all recommentations <ArrowRight />
          </div>
        </a>
      </div>
    </div>
  )
}

export default FeedAddTo
