import {
  Col,
  Row,
  Container,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import "./styles.css";
import * as Icon from "react-bootstrap-icons";
import LinkedinLogo from "../../assets/linkedin-logo-png-transparent.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_USER } from "../../redux/actions";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [loading, setLoading] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };

  //2 inputs + 2 states with event grabber
  //send the data of 2 states to /POST users
  //redirect to login page (maybe with filling up the login page)

  const itemToSend = {
    name: name,
    surname: surname,
    username: username,
    password: password,
  };

  const newPostAction = () => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(itemToSend),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(
        "https://linkedin-backend-production.up.railway.app/users/",
        options
      ).then((s) => {
        console.log(s);
        if (s.status === 400) {
          setWrong(true);
        } else {
          setWrong(false);
          window.location.replace("/");
        }
      });
    } catch (error) {
      setWrong(true);
      // TypeError: Failed to fetch
      console.log("There was an error");
    }
  };
  useEffect(() => {
    console.log(wrong);
  });
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
                className="bg-light d-flex align-items-center justify-content-center"
                xs={8}
                style={{
                  height: "100%",
                  borderTopLeftRadius: "15px",
                  borderBottomLeftRadius: "15px",
                }}
              >
                <div className="w-75">
                  <h3
                    style={{ fontWeight: "600", color: "#328DC4" }}
                    className="text-center pb-3"
                  >
                    Make the most of your professional life
                  </h3>
                  <Form>
                    <div className="d-flex ">
                      <Form.Group controlId="name" className="w-50 pr-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="name"
                          placeholder="Enter your username"
                          value={name}
                          onChange={(e) =>
                            onChangeHandler(e.target.value, setName)
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="surname" className="w-50 pl-2">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control
                          type="surname"
                          placeholder="Enter your surname"
                          value={surname}
                          onChange={(e) =>
                            onChangeHandler(e.target.value, setSurname)
                          }
                        />
                      </Form.Group>
                    </div>
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
                    {wrong === true ? (
                      <Alert variant="danger">
                        This username already exists!
                      </Alert>
                    ) : null}
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

                    {loggedIn === true ? (
                      <Alert variant="success">Creating your account...</Alert>
                    ) : null}
                    <div className="text-center  w-100 pt-3">
                      <p className="d-flex justify-content-center">
                        By clicking Accept and register, you agree to the Terms
                        of Use, the Privacy Policy and cookies Policy LinkedIn.
                      </p>

                      <Button
                        size="lg"
                        variant="outline-primary"
                        className=""
                        style={{
                          borderRadius: "20px",
                        }}
                        onClick={newPostAction}
                      >
                        Accept and Register
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>
              <Col
                style={{
                  height: "100%",
                  borderTopRightRadius: "15px",
                  borderBottomRightRadius: "15px",
                }}
                xs={4}
                id="col-two"
              >
                <div className="d-flex justify-content-end p-2">
                  <img
                    src="https://blog.waalaxy.com/wp-content/uploads/2021/01/Linkedin-Logo-2048x1280.png"
                    style={{ width: "90px", marginRight: "20px" }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
};
export default SignUp;
