import { Row, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import SingleEducation from "./SingleEducation";
import SingleExperienceMainPage from "./SingleExperienceMainPage";
const EducationComponent = () => {
  let pathname = window.location.pathname;
  const user = useSelector((state) => state.user.user);
  console.log(user[0]?.educations);
  return (
    <Row className="my-2">
      <div className="col education-container-design p-4 normal-cursor-on-hover">
        <div className="d-flex justify-content-between">
          <h5 className="text-left mb-0 normal-cursor-on-hover font-weight-bold">
            Education
          </h5>
          <div
            className={pathname === "/me" ? "d-flex cursor-on-hover" : "d-none"}
          >
            <div className="d-flex editButtonIconDiv justify-content-center align-items-center mr-2 add-icon">
              <Icon.Plus />
            </div>
            <div className="d-flex editButtonIconDiv justify-content-center align-items-center edit-icon">
              <Icon.Pencil />
            </div>
          </div>
        </div>
        <div className=" ">
          <ListGroup variant="flush" className="px-0 text-left">
            {user[0]?.educations.length !== 0
              ? user[0]?.educations.map((education) => {
                  return (
                    <SingleEducation key={education._id} edu={education} />
                  );
                })
              : "No experience yet"}
          </ListGroup>
        </div>
      </div>
    </Row>
  );
};

export default EducationComponent;
