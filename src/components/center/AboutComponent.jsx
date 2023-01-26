import { Row } from "react-bootstrap";
import EditUserDetailsModal from "./EditUserDetailsModal";
import { useSelector } from "react-redux";

const AboutComponent = () => {
  const user = useSelector((state) => state.user.user);
  if (user[0]?.bio) {
    return (
      <Row className="my-2">
        <div className="col about-container-design p-4 normal-cursor-on-hover">
          <div className="d-flex justify-content-between">
            <h5 className="text-left mb-0 font-weight-bold">About</h5>
            <EditUserDetailsModal />
          </div>
          <div className="text-left mt-3">{user[0]?.bio}</div>
        </div>
      </Row>
    );
  } else {
    return <></>;
  }
};

export default AboutComponent;
