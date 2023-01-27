import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Pencil, InfoSquareFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-bootstrap-icons";

import {
  changeProfileDetailsAction,
  CHANGE_PROFILE_DETAILS,
  getMyProfileDetailsAction,
} from "../../redux/actions";

function EditUserDetailsModal() {
  // Modal variables
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetching variables
  let details = useSelector((state) => state.myProfile.detailsData);
  let isFetched = useSelector((state) => state.myProfile.isFetched);

  let dispatch = useDispatch();

  // Changing Data via Modal submit

  const [name, setName] = useState(`${details.name}`);
  const [surname, setSurname] = useState(`${details.surname}`);
  // const [email, setEmail] = useState(`${details.email}`)
  const [bio, setBio] = useState(`${details.bio}`);
  const [title, setTitle] = useState(`${details.job}`);
  const [area, setArea] = useState(`${details.location}`);
  const [imageUrl, setImageUrl] = useState(`${details.pfp}`);
  const [image, setImage] = useState([]);
  const [imageUploaded, setImageUploaded] = useState(false);

  // const changedDetails =
  //   imageUploaded === true
  //     ? {
  //         name: name,
  //         surname: surname,
  //         // email: email,
  //         bio: bio,
  //         title: title,
  //         location: area,
  //         pfp: image,
  //       }
  //     : {
  //         name: name,
  //         surname: surname,
  //         // email: email,
  //         bio: bio,
  //         title: title,
  //         location: area,
  //       };
  const submitFileData = async () => {
    const formData = new FormData();
    formData.append("pfp", image);

    const optionsPost = {
      method: "POST",
      body: formData,
    };

    try {
      let res = await fetch(
        `https://linkedin-backend-production.up.railway.app/users/${details._id}/pfp`,
        optionsPost
      );
      console.log(res);
      if (res.ok) {
        dispatch(getMyProfileDetailsAction());
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changedDetails = {
    name: name,
    surname: surname,
    bio: bio,
    job: title,
    location: area,
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch({
      type: CHANGE_PROFILE_DETAILS,
      payload: changedDetails,
    });

    dispatch(changeProfileDetailsAction(changedDetails));
    handleClose();

    if (image !== undefined) {
      submitFileData();
      setImageUploaded(false);
    }
  };

  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };

  let pathname = window.location.pathname;

  return (
    <>
      {/* Button Open Modal */}
      <div
        className="editButtonDivTwo d-flex justify-content-center align-items-center mr-0"
        onClick={handleShow}
      >
        {pathname === "/me" && (
          <Pencil className="text-dark" style={{ fontSize: "20px" }} />
        )}
        {pathname !== "/me" && (
          <Icon.BellFill className="text-dark" style={{ fontSize: "20px" }} />
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "grey" }}>Edit intro</Modal.Title>
        </Modal.Header>
        {isFetched ? (
          <Modal.Body>
            <div className="overflow-auto">
              <p className="lightGreyParagraph mb-4">* indicates required</p>
              <Form style={{ color: "grey", height: "60vh" }}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>First name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    value={name}
                    onChange={(e) => onChangeHandler(e.target.value, setName)}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Last name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    value={surname}
                    onChange={(e) =>
                      onChangeHandler(e.target.value, setSurname)
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Name pronunciation</Form.Label>
                  <div className="d-flex align-items-center mt-2">
                    <InfoSquareFill className="mr-3" />
                    <p className="mb-0">
                      this can only be added using our mobile app
                    </p>
                  </div>
                </Form.Group>
                {/* <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>E-Mail*</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="E-Mail"
                    value={email}
                    onChange={(e) => onChangeHandler(e.target.value, setEmail)}
                  />
                </Form.Group> */}
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Bio*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => onChangeHandler(e.target.value, setBio)}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Job Title*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Current position"
                    value={title}
                    onChange={(e) => onChangeHandler(e.target.value, setTitle)}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Area*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your current city"
                    value={area}
                    onChange={(e) => onChangeHandler(e.target.value, setArea)}
                  />
                </Form.Group>
                {/* <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Image-Url*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https//:"
                    value={image}
                    onChange={(e) => onChangeHandler(e.target.value, setImage)}
                  />
                </Form.Group> */}
                <Form.Group>
                  <Form.Label>Upload your Avatar</Form.Label>
                  <Form.File
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setImageUploaded(true);
                    }}
                    name="profile"
                  />
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body></Modal.Body>
        )}
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={onSubmitHandler}
            className="rounded-pill py-0"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUserDetailsModal;
