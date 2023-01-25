import { Container, Row, Col } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsersAction } from "../../redux/actions";
const Network = () => {
  const [users, setUsers] = useState([]);
  const fetchAllUsers = () => {
    fetch("https://linkedin-backend-production.up.railway.app/users/")
      .then((res) => res.json)
      .then((s) => {
        if (s.length > 0) {
          setUsers(s);
        }
      });
  };

  return (
    <div>
      <Container className="mt-5">
        <div className="d-flex justify-content-center">
          <div
            className="bg-light mr-4 border w-25 p-3"
            style={{ borderRadius: "15px" }}
          >
            Manage my network
            <div className="mt-2 mb-2 d-flex justify-content-between">
              <Row>
                <Col xs={1}>
                  <Icon.PeopleFill />
                </Col>
                <Col>Connections</Col>
              </Row>
              <span>65</span>
            </div>
          </div>
          <Col
            className="bg-light border w-75"
            style={{ height: "200vh", borderRadius: "15px" }}
          >
            huh
          </Col>
        </div>
      </Container>
    </div>
  );
};
export default Network;
