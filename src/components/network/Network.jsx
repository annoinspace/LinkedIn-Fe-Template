import { Container, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserConnectionsAction } from "../../redux/actions";
import FeedFooter from "../feed/FeedFooter";
import "./styles.css";
import SingleConnection from "./SingleConnection";
const Network = () => {
  const currentUser = useSelector((state) => state.myProfile.detailsData);
  const connections = useSelector((state) => state.connections.allConnections);
  const currentUserId = currentUser._id;
  console.log(currentUser._id, "user id");
  console.log("--------------------------------user connections", connections);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserConnectionsAction(currentUserId));
  }, [dispatch, currentUserId]);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        "https://linkedin-backend-production.up.railway.app/users/"
      );
      if (response.ok) {
        const users = await response.json();
        console.log(
          "-------------------------------All users are here 2",
          users
        );
        setUsers(users);
        setLoading(false);
      } else {
        console.log("Error fetching data");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter(
    (obj1) => !connections.some((obj2) => obj2._id === obj1._id)
  );
  console.log("---------------------filtered users", filteredUsers);

  const filteredUsersCurrentUser = filteredUsers.filter(
    (user) => user._id !== currentUserId
  );

  React.useEffect(() => {
    fetchAllUsers().then(setLoading(true));
  }, []);
  const shuffledArray = filteredUsersCurrentUser.sort(
    (a, b) => 0.5 - Math.random()
  );
  if (loading) {
    return (
      <div>
        <div
          className="d-flex justify-content-center align-items-center"
          id="spinner"
        >
          <Spinner animation="border" className=" text-primary" />
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ color: "#5E5E5E" }}>
        <Container className="mt-4">
          <div className="d-flex ">
            <div
              className="bg-light mr-4 border"
              style={{ borderRadius: "10px", width: "30%", height: "100%" }}
            >
              <div className=" mb-2">
                <div className="pt-3 pl-3">Manage my network</div>
                <div id="network-item" className=" mt-2">
                  <div id="network-item-inside">
                    <div className="mr-2">
                      <Icon.PeopleFill size={25} />
                    </div>
                    <Link to="/mynetwork">
                      <div>Connections</div>
                    </Link>
                  </div>
                  <span>{connections.length}</span>
                </div>
                <div id="network-item">
                  <div id="network-item-inside">
                    <div className="mr-2">
                      <Icon.Journal size={25} />
                    </div>
                    <div>Contacts</div>
                  </div>
                </div>
                <div id="network-item">
                  <div id="network-item-inside">
                    <div className="mr-2">
                      <Icon.Person size={25} />
                    </div>
                    <div className="text-truncate">Following & Followers</div>
                  </div>
                  <span>31</span>
                </div>
                <div id="network-item">
                  <div id="network-item-inside">
                    <div className="mr-2">
                      <Icon.CalendarEvent size={25} />
                    </div>
                    <div className="text-truncate">Events</div>
                  </div>
                  <span>3</span>
                </div>
                <div id="network-item">
                  <div id="network-item-inside">
                    <div className="mr-2">
                      <Icon.Building size={25} />
                    </div>
                    <div className="text-truncate">Pages</div>
                  </div>
                </div>
                <div id="network-item">
                  <div id="network-item-inside">
                    <div className="mr-2">
                      <Icon.Newspaper size={25} />
                    </div>
                    <div className="text-truncate">Newsletters</div>
                  </div>
                  <span>2</span>
                </div>
              </div>
              <div
                className="p-2"
                style={{
                  borderBottom: "1px solid #a0a0a0",
                  borderTop: "1px solid #a0a0a0",
                }}
              >
                <img
                  src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png"
                  style={{
                    width: "100%",

                    objectFit: "cover",
                  }}
                  alt=""
                />
              </div>
              <div className="text-center mt-3 mb-5">
                <h5 className="text-dark">Add personal contacts</h5>

                <p>
                  We’ll periodically import and store your contacts to help you
                  and others connect. You choose who to connect to and who to
                  invite.
                </p>
                <div className="pr-2 pl-2">
                  <Form.Control
                    type="email"
                    placeholder="Enter username"
                    className=""
                  />
                  <Button
                    variant="outline-primary"
                    className="pt-1 pb-1 mt-2"
                    style={{ borderRadius: "25px" }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
              <FeedFooter />
            </div>
            <div className="" style={{ width: "70%" }}>
              <div
                className="bg-light border d-flex justify-content-between align-items-center w-100 mb-2 p-3"
                style={{ borderRadius: "10px" }}
              >
                <h6 className="m-0">No pending invitations</h6>
                <h6 className="m-0">Manage</h6>
              </div>
              <div
                className="bg-light border p-3"
                style={{ height: "200vh", borderRadius: "10px" }}
              >
                <div className="d-flex justify-content-between">
                  <h6> People who follow Shakira also follow </h6>
                  <h6> See all </h6>
                </div>

                <div>
                  <Row className="g-0">
                    {shuffledArray.map((connection, index) => {
                      return (
                        <SingleConnection
                          {...connection}
                          key={connection._id}
                        />
                      );
                    })}
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
};
export default Network;
