import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import SideComponentsMyProfile from "../sidebar/SideComponentsMyProfile";
import LargeFooter from "./LargeFooter";
import ProfilePageCenter from "../center/ProfilePageCenter";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfileDetailsAction } from "../../redux/actions";
import { useEffect } from "react";

export default function MyProfile() {
  let details = useSelector((state) => state.myProfile.detailsData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyProfileDetailsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const user = useSelector((state) => state.user.user);

  if (user.length === 0) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: " translate(-50%, -50%)",
        }}
        className="text-center"
      >
        <h3 className="mb-3" style={{ color: "#157EBB" }}>
          It seems that you are not logged in.
        </h3>
        <a href="/">
          <Button
            size="lg"
            variant="outline-primary"
            style={{ borderRadius: "25px" }}
          >
            Sign in
          </Button>
        </a>
      </div>
    );
  } else {
    return (
      <>
        <Container>
          <Row>
            {details.length !== 0 && (
              <Col lg={9}>
                <ProfilePageCenter profileDetails={details} />
              </Col>
            )}
            <Col lg={3} className=" mt-3 p-0 ">
              {" "}
              <SideComponentsMyProfile />
            </Col>
          </Row>
        </Container>
        <LargeFooter />
      </>
    );
  }
}
