import { useSelector, useDispatch } from "react-redux"

import FollowButton from "./FollowButton"

const SideUser = (user) => {
  const { name, surname, pfp, bio, posts, _id, job } = user
  console.log(user)

  return (
    <>
      <div className="d-flex align-items-start p-feed-x mt-2">
        <div
          style={{
            width: "48px",
            aspectRatio: "1/1",
            overflow: "hidden",
            borderRadius: "50%",

            objectFit: "cover"
          }}
        >
          <img
            src={pfp ? pfp : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="feed logo"
            style={{ width: "100%" }}
          />
        </div>
        <div className="p-feed-left ">
          <div style={{ fontSize: "12px", fontWeight: "500" }}>
            {name} {surname}
          </div>

          <div className="pb-1 text-truncate" style={{ fontSize: "12px", width: "170px" }}>
            {job ? job : "Author of " + posts?.length + " posts."}
          </div>

          <FollowButton id={_id} />
        </div>
      </div>
    </>
  )
}
export default SideUser
