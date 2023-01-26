import { ListGroup } from "react-bootstrap";
import moment from "moment";

const SingleEducation = ({ edu }) => {
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
            edu.image
              ? edu.image
              : "https://www.freeiconspng.com/thumbs/experience/competence-skill-experience-company-product--16.png"
          }
          style={{ height: "100%" }}
          alt="company"
        />
      </div>
      <div className="col  px-0 d-flex justify-content-between">
        <ListGroup.Item className="px-0 border-0">
          <h6 style={{ fontWeight: 600 }}>
            {edu.description} at {edu.company}
          </h6>
          <div>{edu.areaOfStudies}</div>
          <div className="light-grey-color">
            {edu.endDate !== null
              ? `${moment(edu.startDate).format("MMMM YYYY")} - ${moment(
                  edu.endDate
                ).format("MMMM YYYY")}`
              : `${moment(edu.startDate).format("MMMM YYYY")} - Present`}
          </div>
          <div className="light-grey-color">{edu.area}</div>
        </ListGroup.Item>
      </div>
    </div>
  );
};

export default SingleEducation;
