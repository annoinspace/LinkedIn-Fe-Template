import { ArrowRight, Check, Dot, InfoSquareFill, Plus } from "react-bootstrap-icons"
import { useSelector, useDispatch } from "react-redux"
import { addNewConnection } from "../../../redux/actions"
import { useState, useEffect } from "react"
const FollowButton = ({ id }) => {
  const currentUser = useSelector((state) => state.myProfile.detailsData)
  const dispatch = useDispatch()
  const currentUserId = currentUser._id
  const [clicked, setClicked] = useState(false)

  const onclickHandler = () => {
    setClicked(true)
    console.log("userId clicked", id)
    console.log("currentUserId ", currentUserId)
    dispatch(addNewConnection(currentUserId, id))
  }

  return (
    <>
      <div
        className="rounded-pill text-dark d-flex align-items-center justify-content-center mb-2 connect-button"
        style={{
          fontSize: "16px",
          fontWeight: "500",
          border: "1px solid",
          width: "100px"
        }}
        onClick={onclickHandler}
      >
        {/* options */}
        {clicked ? (
          <>
            <div
              className="pr-1 d-flex justify-content-center align-items-center"
              style={{
                fontSize: "20px",
                fontWeight: "500"
              }}
            >
              <Check />
            </div>
            <div
              className="pr-1 d-flex justify-content-center align-items-center"
              style={{
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              Following
            </div>
          </>
        ) : (
          <>
            <div
              className="pr-1 d-flex justify-content-center align-items-center"
              style={{
                fontSize: "20px",
                fontWeight: "500"
              }}
            >
              <Plus />
            </div>
            <div
              className="pr-1 d-flex justify-content-center align-items-center"
              style={{
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              Follow
            </div>{" "}
          </>
        )}
        {/* options */}
      </div>
    </>
  )
}
export default FollowButton
