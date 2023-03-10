import React, { useEffect, useState } from "react";
import { Image, Form, Button, Row, Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  BsThreeDots,
  BsFillArrowDownCircleFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { BsHandThumbsUp } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdAddAPhoto } from "react-icons/md";
import {
  editShowToggleAction,
  getFeedPostsAction,
  saveSelectedFeedPostAction,
  myPostUnClickedAction,
} from "../../redux/actions";
import EditOwnPosts from "./EditOwnPosts";
import CommentComp from "./CommentComponent";
import { addCommentToPostAction } from "../../redux/actions";
import { parseISO } from "date-fns";
import format from "date-fns/format";
import InputEmoji from "react-input-emoji";

export default function MainFeedSectionWithPosts() {
  // const [showEdit, setShowEdit] = useState(false)
  const editOptions = useSelector((state) => state.editPostModal.openDropdown);

  const allFeedPosts = useSelector((state) => state.feedPosts.feedPostArray);
  //   reversing the array so we get the newest posts

  const allLatestPosts = allFeedPosts.slice(0).reverse();

  const longerPosts = allLatestPosts;

  const userPresent = longerPosts.filter((post) => {
    return post.user[0] !== null;
  });

  const [length, setLength] = useState(4);
  const latestPostSlice = userPresent.slice(0, length);

  const increaseCurrentLength = (e) => {
    const increment = 4;
    setLength(length + increment);

    if (
      length.length >= userPresent.length ||
      userPresent.length - length.length < increment
    ) {
      alert("you have read all the posts!");
    }
  };

  const userId = useSelector((state) => state.myProfile.detailsData._id);
  const savedPost = useSelector((state) => state.editThisPost.selectedPost);
  const dispatch = useDispatch();

  const myPostClickedHandler = (post) => {
    console.log("my post is clicked");
    dispatch(editShowToggleAction());
    console.log("saved post----------", post);
    // use this post when editing
    dispatch(saveSelectedFeedPostAction(post));
    console.log("edit Options click", editOptions);
  };

  const [open, setOpen] = useState(false);

  const [toggle, setToggle] = useState({});

  const handleClick = (index) => {
    setToggle({
      ...toggle,
      [index]: !toggle[index],
    });
  };

  //unclick the dots button

  const myPostUnClickedHandler = (post) => {
    console.log("my post is UNclicked");
    dispatch(editShowToggleAction());
    dispatch(myPostUnClickedAction(post));
    console.log("unsaved post----------", post);
    console.log("edit Options unclick", editOptions);
  };

  // back to top button

  const backToTop = () => {
    window.scrollTo({ top: 0, behaviour: "smooth" });
  };

  useEffect(() => {
    dispatch(getFeedPostsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };

  const commentImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const [text, setText] = useState("");
  const [image, setImage] = useState([]);

  const onSubmitComment = (id) => {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("author", userId);
    image !== undefined ? formData.append("post", image) : setImage([]);
    if (text === "") {
      alert("You cannot post an empty comment!");
      return;
    } else {
      dispatch(addCommentToPostAction(id, formData));
      setImage([]);
      setText("");
    }
  };

  return (
    <>
      {allFeedPosts && (
        <>
          <div id="feed-main-container">
            {latestPostSlice.map((post, index) => (
              <div key={post._id}>
                {post.user[0]?._id && (
                  <div key={post._id} className="feed-post border p-feed pb-1">
                    {post.user[0]?._id === userId ? (
                      <>
                        <div className="d-flex justify-content-between mr-2 ml-2">
                          <div></div>
                          {editOptions ? (
                            editOptions &&
                            (savedPost._id === post._id ? (
                              <div
                                className="post-dots  gray-hover"
                                onClick={myPostUnClickedHandler.bind(
                                  null,
                                  post
                                )}
                              >
                                <BsThreeDotsVertical />
                              </div>
                            ) : (
                              <div
                                className="post-dots  gray-hover"
                                onClick={myPostClickedHandler.bind(null, post)}
                              >
                                <BsThreeDots />
                              </div>
                            ))
                          ) : (
                            <div
                              className="post-dots  gray-hover"
                              onClick={myPostClickedHandler.bind(null, post)}
                            >
                              <BsThreeDots />
                            </div>
                          )}
                        </div>
                        {editOptions &&
                          (savedPost._id === post._id ? (
                            <EditOwnPosts id={post._id} />
                          ) : null)}
                      </>
                    ) : (
                      <div className="d-flex justify-content-between mr-2 ml-2">
                        <div></div>
                        <div className="post-dots  gray-hover">
                          <BsThreeDots />
                        </div>
                      </div>
                    )}
                    <div className=" border-top mr-2 ml-2">
                      <div className="mt-3 d-flex ">
                        <div className="border recommended-user-image d-flex align-items-start">
                          <img src={post.user[0]?.pfp} alt="" />
                        </div>{" "}
                        <div className="feed-text-user-wrapper">
                          <div className="mb-0 small-header-text bolder feed-text-name">
                            <span>{post.user[0].name} </span>
                            <span>{post.user[0].surname}</span>
                          </div>

                          <div className="small-height">
                            <span className="feed-post-tiny-text truncate-text">
                              {post.user[0].job}
                            </span>
                          </div>
                          <div className="small-height">
                            <span className="feed-post-tiny-text ">
                              {format(
                                parseISO(post.createdAt),
                                "dd/MM/yyyy' at 'HH:mm"
                              )}
                            </span>
                          </div>
                          <div className="small-height">
                            <span className="feed-post-tiny-text text-muted">
                              {" "}
                              {post.createdAt !== post.updatedAt
                                ? "Edited on: " +
                                  format(
                                    parseISO(post.updatedAt),
                                    "dd/MM/yyyy' at 'HH:mm"
                                  )
                                : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 mb-3"> {post.text}</p>

                      {post.image && (
                        <div
                          className="post-image-wrapper p-1"
                          style={{
                            width: "100%",
                            height: "300px",
                            overflow: "hidden",
                            objectFit: "cover",
                          }}
                        >
                          <Image
                            src={post?.image}
                            style={{ objectFit: "cover" }}
                            alt="user image"
                            className="feed-post-image"
                          />
                        </div>
                      )}
                    </div>

                    <div
                      id="like-section-wrapper"
                      className="small-header-text border-top pt-1 pb-0 mr-2 ml-2"
                    >
                      <div className="start-a-post-icon-text gray-hover">
                        <BsHandThumbsUp style={{ fontSize: "20px" }} />

                        <span>Like</span>
                      </div>
                      <div
                        className="start-a-post-icon-text gray-hover"
                        onClick={() => handleClick(index)}
                        aria-controls="example-collapse-text"
                        aria-expanded={toggle[index]}
                      >
                        <FaRegCommentDots
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        />
                        <span>Comments ({post.comments.length})</span>
                      </div>
                      <div className="start-a-post-icon-text gray-hover">
                        <BiRepost style={{ fontSize: "20px" }} />
                        <span>Repost</span>
                      </div>
                      <div className="start-a-post-icon-text gray-hover">
                        <RiSendPlaneFill style={{ fontSize: "20px" }} />
                        <span>Send</span>
                      </div>
                    </div>
                    <Collapse in={toggle[index]}>
                      <div id="example-collapse-text">
                        {post.comments &&
                          post.comments.map((comment, index) => (
                            <CommentComp key={index} comment={comment} />
                          ))}
                        <div>
                          <Form.Group>
                            {/* <Form.Control
                              style={{
                                resize: "",
                                borderRadius: "0rem 10px 10px 10px",
                              }}
                              as="textarea"
                              className="mx-auto mt-2 p-0"
                              rows={2}
                              value={text}
                              onChange={(e) =>
                                onChangeHandler(e.target.value, setText)
                              }
                            /> */}
                            <InputEmoji
                              value={text}
                              onChange={setText}
                              placeholder="Type a comment"
                            />
                          </Form.Group>
                          <Row className="justify-content-center">
                            <div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => commentImageHandler(e)}
                                style={{ display: "none" }}
                                id="icon-button-file"
                              />
                              <label
                                id="photo-hover"
                                htmlFor="icon-button-file"
                              >
                                <MdAddAPhoto
                                  className="mr-3"
                                  style={{ fontSize: "2rem", color: "#138496" }}
                                />
                              </label>
                              <Button
                                style={{ fontSize: "0.8rem" }}
                                variant="info"
                                className="mr-auto"
                                onClick={() => {
                                  onSubmitComment(post._id);
                                }}
                              >
                                Add Comment
                              </Button>
                              <p className="text-small text-muted mr-2">
                                {image.name}
                              </p>
                            </div>
                          </Row>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                )}
              </div>
            ))}

            <div className="d-flex justify-content-center m-5">
              <BsFillArrowDownCircleFill
                onClick={increaseCurrentLength}
                className="text-primary"
                style={{ fontSize: "30px", cursor: "pointer" }}
              />
            </div>
            {length > 25 && (
              <div
                onClick={backToTop}
                id="back-to-top"
                className="gray-hover font-weight-light"
              >
                {" "}
                back to top
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
