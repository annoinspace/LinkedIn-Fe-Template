import { useEffect, useState } from "react";
import { ArrowRight, Dot, InfoSquareFill, Plus } from "react-bootstrap-icons";
import FollowButton from "./Mini Components/FollowButton";
import SideUser from "./Mini Components/SideUser";

const FeedAddTo = () => {
  const [users, setUsers] = useState([]);
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        "https://linkedin-backend-production.up.railway.app/users/"
      );
      if (response.ok) {
        const users = await response.json();
        console.log(
          "-------------------------------All users are here 2",
          users
        );
        setUsers(users);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  console.log(getRandomInt(users.length));

  return (
    <div
      className="bg-white"
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid lightgrey",
      }}
    >
      <div className="d-flex justify-content-between align-items-center p-feed-x">
        <div style={{ fontWeight: "500" }}>Add to your feed</div>
        <div className="d-flex justify-content-center align-items-center editButtonIconDiv ">
          <InfoSquareFill
            style={{ fontSize: "12px" }}
            className="chevronHover"
          />
        </div>
      </div>
      <SideUser {...users[getRandomInt(users.length)]} />
      <SideUser {...users[getRandomInt(users.length)]} />
      <SideUser {...users[getRandomInt(users.length)]} />
      <div className="d-flex p-feed-left py-2 align-items-center">
        <div
          className="hoverGreyBg text-secondary"
          style={{
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          View all recommentations <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default FeedAddTo;
