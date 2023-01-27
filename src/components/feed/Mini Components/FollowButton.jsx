import {
  ArrowRight,
  Check,
  Dot,
  InfoSquareFill,
  Plus,
} from "react-bootstrap-icons";
import { useState, useEffect } from "react";
const FollowButton = () => {
  const [state, setState] = useState(false);
  const changeState = () => {
    if (state === false) {
      setState(true);
    } else {
      setState(false);
    }
  };
  if (state) {
    return (
      <>
        <div
          className="rounded-pill text-dark d-flex justify-content-center align-items-center mb-2 connect-button"
          style={{
            fontSize: "16px",
            fontWeight: "500",
            border: "1px solid",
            width: "100px",
          }}
          onClick={changeState}
        >
          <div
            className="pr-1 d-flex justify-content-center align-items-center"
            style={{
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            <Plus />
          </div>
          <div
            className="pr-1 d-flex justify-content-center align-items-center"
            style={{
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Follow
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <>
          <div
            className="rounded-pill text-dark d-flex align-items-center justify-content-center mb-2 connect-button"
            style={{
              fontSize: "16px",
              fontWeight: "500",
              border: "1px solid",
              width: "100px",
            }}
            onClick={changeState}
          >
            <div
              className="pr-1 d-flex justify-content-center align-items-center"
              style={{
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              <Check />
            </div>
            <div
              className="pr-1 d-flex justify-content-center align-items-center"
              style={{
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Following
            </div>
          </div>
        </>
      </>
    );
  }
};
export default FollowButton;
