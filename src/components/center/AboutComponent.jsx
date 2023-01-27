import { Row } from "react-bootstrap";
import EditUserDetailsModal from "./EditUserDetailsModal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AboutComponent = () => {
  const params = useParams();
  const id = params.id;
  const currentUserId = useSelector((state) => state.myProfile.detailsData._id);
  const otherUserBio = useSelector((state) => state.otherUser.selectedUser.bio);
  const currentUserBio = useSelector(
    (state) => state.myProfile.detailsData.bio
  );
  // const user = useSelector((state) => state.user.user);

  const user =
    id === currentUserId || window.location.pathname === "/me"
      ? currentUserBio
      : otherUserBio;

  if (user) {
    return (
      <Row className="my-2">
        <div className="col about-container-design p-4 normal-cursor-on-hover">
          <div className="d-flex justify-content-between">
            <h5 className="text-left mb-0 font-weight-bold">About</h5>
            <EditUserDetailsModal />
          </div>
          <div className="text-left mt-3">{user}</div>
        </div>
      </Row>
    );
  } else {
    return <></>;
  }
};

export default AboutComponent;
