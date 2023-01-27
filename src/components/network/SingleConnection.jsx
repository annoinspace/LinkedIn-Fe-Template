import { Card, Col, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { addNewConnection } from "../../redux/actions"

const SingleConnection = (props) => {
  const { name, surname, pfp, background, job, _id, description, createdAt } = props
  const [follow, setFollow] = useState("Follow")
  const currentUser = useSelector((state) => state.myProfile.detailsData)
  const dispatch = useDispatch()
  const currentUserId = currentUser._id
  const onclickHandler = () => {
    console.log("userId clicked", _id)
    dispatch(addNewConnection(currentUserId, _id))
    setFollow("Following")
  }
  return (
    <Col xs={4} className="p-1">
      <Card style={{ maxHeight: "13rem" }}>
        <div className="position-relative">
          <Card.Img
            src={background}
            style={{
              objectFit: "cover",
              backgroundSize: "cover",
              aspectRatio: "32/9"
            }}
          />
          <div className="d-flex position-absolute pt-4 pl-3" style={{ bottom: "-20%" }}>
            <img
              src={pfp}
              style={{
                borderRadius: "50%",
                maxWidth: "65px",
                width: "100%",
                aspectRatio: "1/1"
              }}
              alt=""
            />
          </div>
        </div>
        <Card.Body>
          <Card.Title>
            {name} {surname}
          </Card.Title>
          <Card.Text className="text-truncate">{job ? job : "Software Developer"}</Card.Text>
          <Button
            variant="outline-primary"
            style={{ borderRadius: "20px" }}
            className="w-100 pt-1 pb-1"
            onClick={onclickHandler}
          >
            {follow}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}
export default SingleConnection
