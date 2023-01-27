// import { useEffect } from "react"
import { Col, Row, Button } from "react-bootstrap";
import { Dot, Linkedin, Pencil, XLg } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { getMyProfileDetailsAction } from "../../redux/actions"
import EditAddProfileSectionModal from "./EditAddProfileSectionModal";
import EditContactInfoModal from "./EditContactInfoModal";
import EditUserDetailsModal from "./EditUserDetailsModal";
import MoreDropDownButton from "./MoreDropdownButton";
import OpenToDropDownButton from "./OpenToDropdownButton";
import ProfileImageModal from "./ProfileImageModal";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const params = useParams();
  const id = params.id;
  console.log(id);
  let isFetched = useSelector((state) => state.myProfile.isFetched);
  const currentUser = useSelector((state) => state.myProfile.detailsData);
  const connections = useSelector((state) => state.connections.allConnections);
  console.log("connections in profile page", connections);
  const profileToView = useSelector((state) => state.otherUser.selectedUser);
  let pathname = window.location.pathname;
  // const user = useSelector((state) => state.user.user)

  const user =
    currentUser._id === id || window.location.pathname === "/me"
      ? currentUser
      : profileToView;

  const currentProfileId =
    currentUser._id === id || window.location.pathname === "/me"
      ? currentUser._id
      : profileToView._id;

  const dispatch = useDispatch();
  console.log("user in user details", user);

  // useEffect(() => {
  //   dispatch(getMyProfileDetailsAction())
  // }, [user])

  return (
    <Row className="mt-3">
      {isFetched ? (
        <Col className="firstComponent">
          <div
            className="position-relative headerImageDiv mb-4"
            style={{
              borderRadius: "10px 10px 0 0",
            }}
          >
            <div className="position-relative">
              <img
                src={user?.background}
                className=" w-100"
                style={{
                  borderRadius: "10px 10px 0 0",
                  maxHeight: "200px",
                  objectFit: "cover",
                  overflow: "hidden",
                }}
                alt="user profile banner"
              />
              <Row
                className="d-flex position-absolute "
                style={{ bottom: "-17%" }}
              >
                <ProfileImageModal {...user} />
              </Row>
            </div>
          </div>
          {/* User Info Section*/}
          <div className="bg-white " style={{ borderRadius: "0 0 10px 10px" }}>
            {/* User Info Edit Button */}
            <Row className="justify-content-end">
              <div className="d-flex align-items-center cursor-on-hover pr-4">
                <div className="d-flexjustify-content-center align-items-center pt-3 mr-2">
                  {pathname === "/me" ? (
                    <Linkedin fontSize={"20px"} style={{ color: "#aa7520" }} />
                  ) : (
                    <></>
                  )}
                </div>

                <EditUserDetailsModal />
              </div>
            </Row>

            {/* User Info Content */}
            <Row>
              <Col>
                <div className="col-6 d-flex flex-column align-items-start pb-2 px-4 userInfoDiv ">
                  <h4 style={{ fontWeight: "500" }}>
                    {user?.name} {user?.surname}
                  </h4>

                  <h6>{user?.job}</h6>
                  <div className="d-flex align-items-center">
                    <p className="text-secondary my-1">
                      {user?.location} <Dot />
                    </p>
                    <div
                      className="text-primary"
                      style={{ fontSize: "0.8em", cursor: "pointer" }}
                    >
                      <EditContactInfoModal />
                    </div>
                  </div>
                  <a href="/mynetwork">
                    <p>{connections.length} connections</p>
                  </a>

                  {/* Section 3 Links Pills */}
                  <div
                    className={
                      pathname === "/me"
                        ? "col d-flex justify-content-between px-0 my-2"
                        : "col d-flex justify-content-start px-0 my-2"
                    }
                  >
                    <OpenToDropDownButton />
                    <EditAddProfileSectionModal />
                    <MoreDropDownButton />
                  </div>
                </div>
              </Col>
            </Row>

            {/* Open to work section */}
            <Row
              className={
                pathname === "/me"
                  ? "justify-content-between mx-4 pb-4 flex-nowrap"
                  : "d-none"
              }
            >
              {/* Left side */}
              <div className="col-6 d-flex openToWorkDiv px-2 py-2 mr-1">
                <div className="col-11  d-flex flex-column px-0">
                  <p className=" d-flex mb-0 openToWorkParagraph">
                    Open to work
                  </p>

                  <p className="d-flex mb-0 titleParagraph">
                    Frontend Developer, Full Stack Developer
                  </p>
                  <a href="/" className="d-flex seeAllDetailsAnchor">
                    See all details
                  </a>
                </div>
                <div className="col-1 p-0">
                  <div className="iconsOpenToWorkSection">
                    <Pencil />
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div
                className={
                  pathname === "/me"
                    ? "col-6 d-flex shareHiringDiv px-2 py-2 ml-1"
                    : "d-none"
                }
              >
                <div className="col-11  d-flex flex-column px-0">
                  <p className=" d-flex mb-0 openToWorkParagraph">
                    Share that you're hiring and attract qualified candidates
                  </p>

                  <a href="/" className="d-flex seeAllDetailsAnchor">
                    See all details
                  </a>
                </div>
                <div className="col-1 p-0">
                  <div className="iconsOpenToWorkSection">
                    <XLg />
                  </div>
                </div>
              </div>
            </Row>
            <Row className="justify-content-center">
              <Col>
                <a
                  href={`https://linkedin-backend-production.up.railway.app/users/${currentProfileId}/cv`}
                >
                  <Button>CV</Button>
                </a>
              </Col>
            </Row>
          </div>
        </Col>
      ) : (
        <></>
      )}
    </Row>
  );
};

export default UserDetails;
