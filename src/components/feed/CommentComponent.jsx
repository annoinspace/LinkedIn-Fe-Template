import { Container, ListGroup, Row, Col, Collapse } from "react-bootstrap";
import { useState } from "react";

const CommentComp = ({ comment }) => {

  return (
        <ListGroup.Item
          style={{ backgroundColor: "#F2F2F2", borderRadius: "20px" }}
          className="m-3"
        >
          <div className="d-flex flex-row">
            <div className="border recommended-user-image">
              <img src={comment.author[0]?.pfp} alt="" />
            </div>
            <div className="d-flex flex-column">
              <div className="mb-0 small-header-text bolder feed-text-name">
                {comment.author[0].name} {comment.author[0].surname}
              </div>
              <div
                style={{ fontSize: "0.6rem" }}
                className="mt-1 text-muted feed-text-name"
              >
                {comment.author[0].job}
              </div>
              <Container className="p-0 m-0">{comment.text}</Container>
            </div>
          </div>
        </ListGroup.Item>
  );
};

export default CommentComp;
