import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  hideAddPostModalAction,
  addingNewFeedPostAction,
  getFeedPostsAction,
} from "../../redux/actions";
import placeholder from "../../assets/v-team-logo.png";
import { AiFillCaretDown } from "react-icons/ai";
import { ImEarth } from "react-icons/im";

export default function WritePostModal() {
  const showModal = useSelector((state) => state.showPostModal.show);
  let details = useSelector((state) => state.myProfile.detailsData);
  let isFetched = useSelector((state) => state.myProfile.isFetched);
  let id = details._id;
  const dispatch = useDispatch();

  // const [newFeedPost, setNewFeedPost] = useState({
  //   text: "",
  // });

  // the basic structure of the post
  //   {
  //     "_id": "5d93ac84b86e220017e76ae1", 				// server generated
  //     "text": "this is a post text",  		// the only property you need to send
  //     "username": "admin", 											// server generated
  //     "createdAt": "2019-10-01T19:44:04.496Z", 	// server generated
  //     "updatedAt": "2019-10-01T19:44:04.496Z", 	// server generated
  //     "__v": 0 																	// server generated
  // }
  // const onChangeHandler = (value, fieldToSet) => {
  //   setNewFeedPost({
  //     ...newFeedPost,
  //     [fieldToSet]: value,
  //   });
  // };
  const [text, setText] = useState("");
  const [name, setName] = useState(details.name);
  const [surname, setSurname] = useState(details.surname);
  const [username, setUsername] = useState(details.username);
  const [image, setImage] = useState([]);

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   console.log(newFeedPost.text);
  //   dispatch(hideAddPostModalAction());
  //   dispatch(addingNewFeedPostAction(newFeedPost));
  //   dispatch(getFeedPostsAction());
  // };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post", image);
    formData.append("text", text);
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("username", username);
    dispatch(addingNewFeedPostAction(formData, id));
    dispatch(hideAddPostModalAction());
  };

  const imageChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };

  return (
    <Modal show={showModal} onHide={() => dispatch(hideAddPostModalAction())}>
      <Modal.Header closeButton>
        <h5 className="font-weight-light ml-1 mb-0">Create a post</h5>
      </Modal.Header>
      <div className="p-feed ml-2 d-flex">
        {" "}
        <div className="border recommended-user-image">
          <img src={isFetched ? details.pfp : placeholder} alt="avatar" />
        </div>
        <div>
          <div className="small-header-text font-weight-bold">
            {details.name} {details.surname}
          </div>
          <div
            id="select-viewing-options"
            className="font-weight-light recommended-user-job-description-text gray-hover"
          >
            <ImEarth />
            <div className="d-flex align-items-center"> Anyone</div>
            <AiFillCaretDown />
          </div>
        </div>
      </div>
      <div id="feed-modal-form">
        <Form
          onSubmit={onSubmitHandler}
          className="p-feed-left p-feed-right ml-2 mr-2"
          style={{ color: "grey", height: "25vh" }}
        >
          <Form.Group className="mb-3 " controlId="formPostText">
            <Form.Control
              className="border-0"
              as="textarea"
              placeholder="What do you want to talk about?"
              value={text}
              onChange={(e) => onChangeHandler(e.target.value, setText)}
              rows={5}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Attach an image to your post:</Form.Label>
            <Form.File
              name="post"
              accept="image/jpg, image/jpeg, image/png, image/gif"
              onChange={(e) => imageChangeHandler(e)}
            />
          </Form.Group>
        </Form>
      </div>
      <Modal.Footer>
        <Button variant="primary" onClick={(e) => onSubmitHandler(e)}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
