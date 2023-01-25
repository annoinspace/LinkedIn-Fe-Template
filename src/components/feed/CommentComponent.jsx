import { Container, ListGroup, Row, Col, Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";
import { TiDeleteOutline } from "react-icons/ti";
import { deleteCommentAction } from "../../redux/actions";
import { useDispatch } from "react-redux";

const CommentComp = ({ comment }) => {
  const currentUserId = useSelector((state) => state.myProfile.detailsData._id);
  const dispatch = useDispatch();

  return (
    <ListGroup.Item
      style={{ backgroundColor: "#F2F2F2", borderRadius: "20px" }}
      className="m-1"
    >
      <div className="d-flex flex-row">
        <div className="border recommended-user-image">
          <img src={comment.author[0]?.pfp} alt="" />
        </div>
        <div className="d-flex flex-column">
          <div className="mb-0 small-header-text bolder feed-text-name">
            {comment.author[0].name} {comment.author[0].surname}{" "}
            {currentUserId === comment.author[0]._id ? (
              <button
                style={{ background: "none", border: "none", color: "red" }}
                onClick={() => dispatch(deleteCommentAction(comment._id))}
              >
                <TiDeleteOutline />
              </button>
            ) : (
              ""
            )}
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
