import { ListGroup } from "react-bootstrap";
import moment from "moment";
import EditSingleExperienceModal from "./EditSingleExperienceModal";

const SingleExperienceMainPage = ({ exp }) => {
  return (
    <div className="d-flex align-items-start border-bottom">
      <div
        className="d-flex justify-content-center align-items center rounded-circle mr-3 mt-3"
        style={{
          overflow: "hidden",
          width: "50px",
          aspectRatio: "1/1",
          objectFit: "cover",
        }}
      >
        <img
          src={
            exp.image
              ? exp.image
              : "https://www.freeiconspng.com/thumbs/experience/competence-skill-experience-company-product--16.png"
          }
          style={{ height: "100%" }}
          alt="company"
        />
      </div>
      <div className="col  px-0 d-flex justify-content-between">
        <ListGroup.Item className="px-0 border-0">
          <h6 className="font-weight-bold">{exp.role}</h6>
          <div>{exp.company}</div>
          <div className="light-grey-color">
            {exp.endDate !== null
              ? `${moment(exp.startDate).format("MMMM YYYY")} - ${moment(
                  exp.endDate
                ).format("MMMM YYYY")}`
              : `${moment(exp.startDate).format("MMMM YYYY")} - Present`}
          </div>
          <div className="light-grey-color">{exp.area}</div>
        </ListGroup.Item>
      </div>
    </div>
  );
};

export default SingleExperienceMainPage;
