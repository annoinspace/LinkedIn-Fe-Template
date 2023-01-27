import { useEffect, useState } from "react";
import { Container, Row, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ExperienceModal from "./ExperienceModal";
import { getExperiencesAction } from "../../redux/actions";
import { UPDATE_STATE_OF_EXPERIENCES } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import SingleExperience from "./SingleExperience";
import SingleExperienceMainPage from "./SingleExperienceMainPage";
import { useParams } from "react-router-dom";
const ExperienceComponent = () => {
  let pathname = window.location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const [fetched, setFetched] = useState([]);
  const params = useParams();
  const id = params.id;
  //if random user then main user
  let userId = id;

  //checks if a new experience has been added
  let isNewExperienceAdded = useSelector(
    (state) => state.experiences.newExperienceAdded
  );

  //checks if an experience has been deleted
  let didWeDeleteAnExperience = useSelector(
    (state) => state.experiences.deletedExp
  );

  const user = useSelector((state) => state.user.user);

  let experiencesArray = user.experiences;
  if (window.location.pathname.includes("/profile")) {
    // {
    //   fetchUser();
    // }
  } else {
    experiencesArray = user[0]?.experiences;
  }
  //fetches all the experiences with GET method
  useEffect(() => {
    if (userId) {
      dispatch(getExperiencesAction(userId));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getExperiencesAction(userId));
    }
  }, [userId, didWeDeleteAnExperience]);

  useEffect(() => {
    if (userId && isNewExperienceAdded === true) {
      dispatch(getExperiencesAction(userId));
      dispatch({
        type: UPDATE_STATE_OF_EXPERIENCES,
        payload: false,
      });
    }
  }, [userId, isNewExperienceAdded]);

  //the plus button for showing the little dropdown with the "Add position" for opening the modal
  //for adding a new experience
  const [plusButton, setPlusButton] = useState(false);

  const location = window.location.pathname;

  return (
    <>
      {location === "/editexperiences" ? (
        <Container className="profilePageCenterContainer px-0">
          <Row className="my-2">
            <div className="col experience-container-design p-4 normal-cursor-on-hover">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="editButtonIconDiv d-flex justify-content-center align-items-center">
                    <Link
                      to={-1}
                      className="text-decoration-none text-secondary"
                    >
                      <Icon.ArrowLeft
                        style={{ fontSize: "25px" }}
                        className="text-dark"
                      />
                    </Link>
                  </div>
                  <h5 className="text-left ml-4 mb-0 normal-cursor-on-hover font-weight-bold">
                    Experience
                  </h5>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column justify-content-center align-items-center cursor-on-hover">
                    <div
                      className={
                        plusButton === true
                          ? "d-flex editButtonIconDiv justify-content-center align-items-center mr-2 add-icon rounded-circle plus-icon-button-experience-container"
                          : "d-flex editButtonIconDiv justify-content-center align-items-center mr-2 add-icon rounded-circle "
                      }
                      onClick={() => {
                        if (plusButton === false) {
                          setPlusButton(true);
                        } else {
                          setPlusButton(false);
                        }
                      }}
                    >
                      <Icon.Plus />
                    </div>

                    <div
                      className={
                        plusButton === true
                          ? "visible experience-dropdown light-grey-color p-3"
                          : "invisible experience-dropdown light-grey-color p-3"
                      }
                    >
                      <ExperienceModal />
                      <div className="d-flex">
                        <div className="mr-2">
                          <Icon.Calendar2Date />
                        </div>
                        <div>Add career break</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-5 ">
                <ListGroup variant="flush" className="px-0 text-left">
                  {/* we are mapping all the experiences and displaying them with SingleExp comp */}
                  {experiencesArray.length !== 0
                    ? experiencesArray.map((experience) => {
                        return (
                          <SingleExperience
                            key={experience._id}
                            exp={experience}
                          />
                        );
                      })
                    : "No experience yet"}
                </ListGroup>
              </div>
            </div>
          </Row>
        </Container>
      ) : (
        <>
          <Row className="my-2">
            <div className="col experience-container-design p-4 normal-cursor-on-hover">
              <div className="d-flex justify-content-between">
                <h5 className="text-left mb-0 normal-cursor-on-hover font-weight-bold">
                  Experience
                </h5>
                <div
                  className={
                    pathname === "/me"
                      ? "d-flex text-center cursor-on-hover"
                      : "d-none"
                  }
                >
                  <div
                    className={
                      plusButton === true
                        ? "d-flex editButtonIconDiv justify-content-center align-items-center mr-2 add-icon rounded-circle plus-icon-button-experience-container"
                        : "d-flex editButtonIconDiv justify-content-center align-items-center mr-2 add-icon rounded-circle "
                    }
                    onClick={() => {
                      if (plusButton === false) {
                        setPlusButton(true);
                      } else {
                        setPlusButton(false);
                      }
                    }}
                  >
                    <Icon.Plus />
                  </div>
                  <div className="d-flex editButtonIconDiv justify-content-center align-items-center edit-icon">
                    <Link to={"/editexperiences"}>
                      <Icon.Pencil
                        className="text-dark pb-1"
                        style={{ fontSize: "23px" }}
                      />
                    </Link>
                  </div>
                  <div
                    className={
                      plusButton === true
                        ? "visible experience-dropdown light-grey-color p-3"
                        : "invisible experience-dropdown light-grey-color p-3"
                    }
                  >
                    <ExperienceModal />
                    <div className="d-flex">
                      <div className="mr-2">
                        <Icon.Calendar2Date />
                      </div>
                      <div>Add career break</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {experiencesArray?.length !== 0 &&
                experiencesArray !== undefined ? (
                  <ListGroup variant="flush" className="px-0 text-left">
                    <div className="">
                      {/* we are mapping all the experiences and displaying them with SingleExp comp */}
                      {experiencesArray.length !== 0
                        ? experiencesArray.map((experience) => {
                            return (
                              <SingleExperienceMainPage
                                key={experience._id}
                                exp={experience}
                              />
                            );
                          })
                        : "No experience yet"}
                    </div>
                    <ListGroup.Item className="px-0 text-center pb-0">
                      <div className="d-flex align-items-center justify-content-center  pt-4">
                        <div
                          className="cursor-on-hover"
                          onClick={() => {
                            navigate("/editexperiences");
                          }}
                        >
                          Show all {experiencesArray.length} experiences
                        </div>
                        <Icon.ArrowRight className="font-weight-bold ml-2 cursor-on-hover" />
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Row>
        </>
      )}
    </>
  );
};

export default ExperienceComponent;
