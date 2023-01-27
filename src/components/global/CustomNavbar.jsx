import { useState } from "react";
import { Container, Navbar, Nav, ListGroup, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchField from "./SearchField";
import { SET_USER } from "../../redux/actions";
import { useDispatch } from "react-redux";
const CustomNavbar = () => {
  const navigate = useNavigate();
  const [meSelected, setMeSelected] = useState(false);
  const user = useSelector((state) => state.user.user);

  const currentUser = useSelector((state) => state.myProfile.detailsData);
  // const userTitle = useSelector((state) => state.myProfile.detailsData.title);

  const dispatch = useDispatch();
  const signOut = () => {
    dispatch({
      type: SET_USER,
      payload: [],
    });
    window.location.replace("/");
  };
  if (user.length === 0) {
    return (
      <Navbar
        expand="lg"
        variant="light"
        bg="white"
        className="sticky-top"
        style={{ zIndex: 100 }}
      >
        {" "}
        <Container className="d-flex justify-content-between align-items-center navbar-font-sizes">
          <div
            onClick={() => {
              setMeSelected(false);
            }}
            className="d-flex"
          >
            <div className="my-auto">
              <Navbar.Brand href="/home">
                <Icon.Linkedin className="navbar-logo-icon" />
              </Navbar.Brand>
            </div>
          </div>
          <div className="d-flex border-left">
            <div className="mr-1 ml-1">
              <a href="/">
                <Button
                  variant="outline"
                  className="text-dark"
                  style={{ borderRadius: "25px" }}
                >
                  Join now
                </Button>
              </a>
            </div>
            <div className="mr-1 ml-1">
              <a href="/">
                <Button
                  variant="outline-primary"
                  style={{ borderRadius: "25px" }}
                >
                  Sign in
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <>
        <Navbar
          expand="lg"
          variant="light"
          bg="white"
          className="sticky-top"
          style={{ zIndex: 100 }}
        >
          <Container className="d-flex justify-content-between align-items-center navbar-font-sizes">
            <div
              onClick={() => {
                setMeSelected(false);
              }}
              className="d-flex"
            >
              <div className="my-auto">
                <Navbar.Brand href="/home">
                  <Icon.Linkedin className="navbar-logo-icon" />
                </Navbar.Brand>
              </div>
              <SearchField />
            </div>

            <Nav className="rightSideNavbarContainer d-flex align-items-center justify-content-center flex-row mx-auto mx-md-none">
              <Link
                onClick={() => {
                  setMeSelected(false);
                }}
                to={"/home"}
              >
                <div
                  className="nav-link d-flex flex-column justify-content-around align-items-center cursor-on-hover mr-4 mr-sm-2 mr-md-none"
                  style={{ fontWeight: "600" }}
                >
                  <div>
                    <Icon.HouseDoorFill className="mr-sm-3 mr-md-0" />
                  </div>
                  <div className="d-none d-md-block">Home</div>
                </div>
              </Link>
              <Link to="/network">
                <div
                  onClick={() => {
                    setMeSelected(false);
                  }}
                  className="nav-link d-flex flex-column justify-content-around align-items-center cursor-on-hover mr-4 mr-sm-2 mr-md-none"
                  style={{ fontWeight: "600" }}
                >
                  <div>
                    <Icon.PeopleFill className="mr-sm-3 mr-md-0" />
                  </div>
                  <div className="d-none d-md-block">My Network</div>
                </div>
              </Link>
              <Link to="/home">
                <div
                  onClick={() => {
                    setMeSelected(false);
                  }}
                  className="nav-link d-flex flex-column justify-content-around align-items-center cursor-on-hover mr-4 mr-sm-2 mr-md-none"
                  style={{ fontWeight: "600" }}
                >
                  <div>
                    <Icon.BriefcaseFill className="mr-sm-3 mr-md-0" />
                  </div>
                  <div className="d-none d-md-block">Jobs</div>
                </div>
              </Link>
              <Link to="/home">
                <div
                  onClick={() => {
                    setMeSelected(false);
                  }}
                  className="nav-link d-flex flex-column justify-content-around align-items-center cursor-on-hover mr-4 mr-sm-2 mr-md-none"
                  style={{ fontWeight: "600" }}
                >
                  <div>
                    <Icon.ChatRightDotsFill className="mr-sm-3 mr-md-0" />
                  </div>
                  <div className="d-none d-md-block">Messaging</div>
                </div>
              </Link>
              <Link to="/home">
                <div
                  onClick={() => {
                    setMeSelected(false);
                  }}
                  className="nav-link d-flex flex-column justify-content-around align-items-center cursor-on-hover mr-4 mr-sm-2 mr-md-none"
                  style={{ fontWeight: "600" }}
                >
                  <div>
                    <Icon.BellFill className="mr-sm-3 mr-md-0" />
                  </div>
                  <div className="d-none d-md-block">Notifications</div>
                </div>
              </Link>
              <div
                className=" test nav-link d-flex flex-column justify-content-around align-items-center cursor-on-hover mr-4 mr-sm-2 mr-md-none position-relative"
                onClick={() => {
                  if (meSelected === false) {
                    setMeSelected(true);
                  } else {
                    setMeSelected(false);
                  }
                }}
              >
                <div className="me-icon-container d-sm-flex my-auto d-md-block my-md-0">
                  <img
                    src={currentUser?.pfp}
                    alt=""
                    className="d-flex align-items-center justify-content-center"
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="d-none d-md-block">Me</div>
                  <Icon.CaretDownFill className="d-none d-md-block" />
                  <div
                    className={
                      meSelected === false
                        ? "d-flex justify-content-between me-dropdown-list invisible"
                        : "d-flex justify-content-between me-dropdown-list visible"
                    }
                  >
                    <ListGroup style={{ width: "350px" }}>
                      <ListGroup.Item>
                        <div className="d-flex mb-2">
                          <div className="me-dropdown-image">
                            <img
                              src={currentUser?.pfp}
                              alt=""
                              className="d-flex align-items-center justify-content-center"
                            />
                          </div>
                          <div className="ml-2 underline-on-hover">
                            <div className="me-dropdown-big-element">
                              {currentUser?.name} {currentUser?.surname}
                            </div>
                            <div>{user[0]?.job}</div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <Button
                            className="me-dropdown-button w-100"
                            onClick={() => {
                              navigate("/me");
                              setMeSelected(false);
                            }}
                          >
                            View Profile
                          </Button>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="underline-on-hover">
                        <div className="me-dropdown-big-element">Account</div>
                        <div>Settings & Privacy</div>
                        <div>Help</div>
                        <div>Language</div>
                      </ListGroup.Item>
                      <ListGroup.Item className="underline-on-hover">
                        <div className="me-dropdown-big-element">Manage</div>
                        <div>Posts & Activity</div>
                        <div>Job Posting Account</div>
                      </ListGroup.Item>

                      <ListGroup.Item className="underline-on-hover" onClick={signOut}>
                        <div>Sign Out</div>

                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </div>
              </div>
              <div
                onClick={() => {
                  setMeSelected(false);
                }}
                className="nav-link d-flex flex-column justify-content-around align-items-center border-left cursor-on-hover ml-0 ml-sm-2 ml-md-none pl-4 pl-sm-2 pl-md-none"
              >
                <div className="d-sm-lex my-auto d-md-block my-md-0">
                  <Icon.Grid3x3GapFill className="mr-sm-3 mr-md-0" />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="d-none d-md-block">Work</div>
                  <Icon.CaretDownFill className="d-none d-md-block" />
                </div>
              </div>
              <div
                onClick={() => {
                  setMeSelected(false);
                }}
                className="nav-link d-flex flex-column justify-content-around align-items-center cursor-on-hover ml-4 ml-sm-2 ml-md-none"
              >
                <div
                  onClick={() => {
                    setMeSelected(false);
                  }}
                >
                  <Icon.CardChecklist />
                </div>
                <div
                  onClick={() => {
                    setMeSelected(false);
                  }}
                  className="d-none d-md-block"
                >
                  Learning
                </div>
              </div>
            </Nav>
          </Container>
        </Navbar>
        {/* <div
        onClick={() => {
          setMeSelected(false);
        }}
        className="containerTest"
      ></div> */}
      </>
    );
  }
};

export default CustomNavbar;
