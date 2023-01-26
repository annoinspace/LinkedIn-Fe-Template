import {
  Col,
  Row,
  Container,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import * as Icon from "react-bootstrap-icons";
import LinkedinLogo from "../../assets/linkedin-logo-png-transparent.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_USER } from "../../redux/actions";
import { useSelector } from "react-redux";
const LoginPage = () => {
  const user = useSelector((state) => state.user.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch(
      `https://linkedin-backend-production.up.railway.app/users/login?username=${username}&password=${password}`
    )
      .then((res) => res.json())
      .then((s) => {
        if (s.length > 0) {
          setWrong(false);
          setLoggedIn(true);
          console.log(s);
          dispatch({
            type: SET_USER,
            payload: s,
          });
          setLoading(false);
          window.location.replace("/home");
        } else {
          setLoading(false);
          setWrong(true);
        }
      });
  };
  if (user.length > 0) {
    return <>{window.location.replace("/home")}</>;
  } else {
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
        <>
          <div className="w-100 h-100" id="main">
            <Container
              className="bg-light w-100 h-100"
              style={{ borderRadius: "15px" }}
              id="main-container"
            >
              <Row className="h-100">
                <Col
                  style={{
                    height: "100%",
                    borderTopLeftRadius: "15px",
                    borderBottomLeftRadius: "15px",
                  }}
                  xs={3}
                  id="col-two"
                >
                  <div className="w-100">
                    <img
                      src="https://blog.waalaxy.com/wp-content/uploads/2021/01/Linkedin-Logo-2048x1280.png"
                      style={{ width: "50%", marginRight: "20px" }}
                    />
                  </div>
                </Col>
                <Col
                  className="bg-light d-flex align-items-center justify-content-center"
                  xs={9}
                  style={{
                    height: "100%",
                    borderTopRightRadius: "15px",
                    borderBottomRightRadius: "15px",
                  }}
                >
                  <div className="w-75">
                    <h2 style={{ fontWeight: "600", color: "#328DC4" }}>
                      Welcome
                    </h2>
                    <Form>
                      <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="username"
                          placeholder="Enter your username"
                          value={username}
                          onChange={(e) =>
                            onChangeHandler(e.target.value, setUsername)
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) =>
                            onChangeHandler(e.target.value, setPassword)
                          }
                        />
                      </Form.Group>
                      {wrong === true ? (
                        <Alert variant="danger">
                          Wrong Username or Password!
                        </Alert>
                      ) : null}
                      {loggedIn === true ? (
                        <Alert variant="success">Logging you in...</Alert>
                      ) : null}
                      <div className=" d-flex justify-content-end">
                        <Link to="/sign-up">
                          <Button
                            size="lg"
                            style={{
                              backgroundColor: "#D8E5E9",
                              color: "#0173B5",
                              border: "none",
                              borderRadius: "0",
                            }}
                          >
                            Sign up
                          </Button>
                        </Link>
                        <Button
                          type="submit"
                          size="lg"
                          style={{
                            backgroundColor: "#0173B5",
                            color: "#D8E5E9",
                            border: "none",
                            borderRadius: "0",
                          }}
                          onClick={onSubmit}
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      );
    }
  }
};
export default LoginPage;
