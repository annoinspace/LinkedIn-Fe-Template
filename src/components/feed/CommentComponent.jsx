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
import { editCommentAction } from "../../redux/actions";
import { parseISO } from "date-fns";
import format from "date-fns/format";

const CommentComp = ({ comment }) => {
  const currentUserId = useSelector((state) => state.myProfile.detailsData._id);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [text, setText] = useState(comment.text);
  const [image, setImage] = useState([]);

  const commentImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmitComment = (id) => {
    const formData = new FormData();
    formData.append("text", text);
    image !== undefined ? formData.append("post", image) : setImage([]);
    if (text === "") {
      alert("You cannot post an empty comment!");
      return;
    } else {
      dispatch(editCommentAction(id, formData));
      setImage([]);
      setText("");
      handleClose();
    }
  };

  return (
    <>
      <ListGroup.Item
        style={{
          backgroundColor: "#F2F2F2",
          borderRadius: "10px",
        }}
        className="m-2"
      >
        <div className="d-flex flex-row">
          <div>
            <img
              src={comment.author[0]?.pfp}
              alt=""
              className="recommended-user-image"
            />
          </div>
          <div className="d-flex flex-column ">
            <div className="small-header-text d-flex align-items-center">
              {comment.author[0].name} {comment.author[0].surname}{" "}
              {currentUserId === comment.author[0]._id ? (
                <>
                  <button
                    style={{ background: "none", border: "none", color: "red" }}
                    className="d-flex align-items-center"
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
                    className="d-flex align-items-center"
                  >
                    <MdOutlineModeEditOutline
                      onClick={() => {
                        handleShow();
                        setText(comment.text);
                      }}
                    />
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
            <div
              style={{ fontSize: "0.6rem" }}
              className="text-muted feed-text-name"
            >
              {comment.author[0].job}
              <div className="feed-post-tiny-text  ">
                {format(parseISO(comment.createdAt), "dd/MM/yyyy' at 'HH:mm")}
              </div>
            </div>
            <Container className="p-0 mt-4">{comment.text}</Container>
            <Container>
              {comment.image && (
                <div className="post-image-wrapper p-1 mx-auto">
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
            <Form.Control
              as="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
            />
          </Form.Group>
          <label id="photo-hover" htmlFor="icon-file">
            <MdAddAPhoto
              className="mr-3"
              style={{ fontSize: "2rem", color: "#138496" }}
            />
          </label>
          <input
            onChange={(e) => commentImageHandler(e)}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="icon-file"
          />
          <span>{image.name}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => onSubmitComment(comment._id)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentComp;
