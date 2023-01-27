import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import FeedLeftAccordeon from "../feed/FeedLeftAccordeon"
import { getUserConnectionsAction } from "../../redux/actions"
import { Container, Row, Col } from "react-bootstrap"
import LargeFooter from "../global/LargeFooter"
import SimpleTextMyProfile from "../sidebar/SimpleTextMyProfile"
import { BsThreeDots } from "react-icons/bs"

export default function MyConnections() {
  const currentUser = useSelector((state) => state.myProfile.detailsData)
  const connections = useSelector((state) => state.connections.allConnections)
  const currentUserId = currentUser._id
  console.log(currentUser._id, "user id")
  console.log("connections", connections)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserConnectionsAction(currentUserId))
  }, [dispatch, currentUserId])

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col lg={8}>
            <div className=" border side-component-border bg-white p-3 ">
              <div className="pl-2 pt-1">{connections.length} Connections</div>
              <div className="d-flex justify-content-between p-2">
                {/* <div>sort by</div>
                <div>sort by</div> */}
              </div>
              {connections.map((connection) => (
                <div key={connection._id} className="d-flex p-1 mt-1 mb-1  ">
                  <div className="border connected-user-image ">
                    <img src={connection.pfp} alt="" />
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-top w-100">
                    <div>
                      <div className="connection-header-text">
                        {connection.name} {connection.surname}
                      </div>
                      <div className=" connection-user-job-description-text">{connection.job}</div>
                    </div>

                    <div className="d-flex align-items-center mr-2">
                      <div className="connect-button mr-3">Message</div>

                      <BsThreeDots />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>

          <Col lg={4}>
            <>
              <div className=" border side-component-border bg-white">
                <div>
                  <SimpleTextMyProfile text="Add personal contacts" />
                  <hr style={{ width: "90%" }} />
                  <SimpleTextMyProfile text="Add profile in another language" />
                </div>
              </div>
              <div className="mt-2">
                <FeedLeftAccordeon />
              </div>
            </>
          </Col>
        </Row>
      </Container>
      <LargeFooter />
    </>
  )
}
