import React from "react";
import { RxDotFilled } from "react-icons/rx";
import ButtonMessage from "./ButtonMessage";
// import { Image } from "react-bootstrap-icons"

export default function RecommendedUser({ user }) {
  return (
    <div className="recommended-user-container bg-white">
      <div className="d-flex recommended-user-content">
        <div className="border recommended-user-image">
          <img src={user.pfp} alt="" />
          {/* <Image src={user.image} /> */}
        </div>
        <div className="text-left">
          <h6 className="mb-0">
            <span className="small-header-text"> {user.name} </span>
            <span className="small-header-text"> {user.surname}</span>
            <RxDotFilled />
            <span className="font-weight-light  small-header-text"> 1st </span>
          </h6>
          <div className="font-weight-light recommended-user-job-description-text">
            {user.job}
          </div>
        </div>{" "}
      </div>

      <ButtonMessage />
    </div>
  );
}
