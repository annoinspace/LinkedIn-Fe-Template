import { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getMyProfileDetailsAction } from "../../redux/actions";
import Center from "./Center";
import Leftside from "./Leftside";
import Rightside from "./Rightside";
import { useSelector } from "react-redux";
const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfileDetailsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const user = useSelector((state) => state.user.user);
  if (user.length === 0) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: " translate(-50%, -50%)",
        }}
        className="text-center"
      >
        <h3 className="mb-3" style={{ color: "#157EBB" }}>
          It seems that you are not logged in.
        </h3>
        <a href="/">
          <Button
            size="lg"
            variant="outline-primary"
            style={{ borderRadius: "25px" }}
          >
            Sign in
          </Button>
        </a>
      </div>
    );
  } else {
    return (
      <Container className="mt-4">
        <Row>
          <Col xs={3} className={"pr-4 pl-0"}>
            <div>
              <Leftside />
            </div>
          </Col>
          <Col xs={6} className={"pr-4 pl-0"}>
            <div>
              <Center />
            </div>
          </Col>
          <Col xs={3} className={"px-0"}>
            <div>
              <Rightside />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Feed;
