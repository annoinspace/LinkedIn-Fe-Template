import {
  Container,
  ListGroup,
  Modal,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { TiDeleteOutline } from "react-icons/ti";
import { deleteCommentAction } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { MdOutlineModeEditOutline, MdAddAPhoto } from "react-icons/md";
import { useState } from "react";

const CommentComp = ({ comment }) => {
  const currentUserId = useSelector((state) => state.myProfile.detailsData._id);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [text, setText] = useState(comment.text)
  const [image, setImage] = useState([])

  return (
    <>
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
                <>
                  <button
                    style={{ background: "none", border: "none", color: "red" }}
                    onClick={() => dispatch(deleteCommentAction(comment._id))}
                  >
                    <TiDeleteOutline />
                  </button>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "grey",
                    }}
                  >
                    <MdOutlineModeEditOutline onClick={() => handleShow()} />
                  </button>
                </>
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
            <Container>
              {comment.image && (
                <div className="post-image-wrapper p-1">
                  <Image
                    style={{
                      width: "100%",
                      height: "300px",
                      overflow: "hidden",
                      objectFit: "cover",
                    }}
                    src={comment.image}
                    alt="user image"
                    className="feed-post-image"
                  />
                </div>
              )}
            </Container>
          </div>
        </div>
      </ListGroup.Item>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Comment:</Form.Label>
            <Form.Control as="textarea" value={text} rows={3} />
          </Form.Group>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
          />
          <label id="photo-hover" htmlFor="icon-button-file">
            <MdAddAPhoto
              className="mr-3"
              style={{ fontSize: "2rem", color: "#138496" }}
            />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentComp;
