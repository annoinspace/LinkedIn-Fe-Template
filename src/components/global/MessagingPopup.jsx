import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { expandMessengerAction, collapseMessengerAction } from "../../redux/actions"
import { BsThreeDots } from "react-icons/bs"
import { BiSearch } from "react-icons/bi"
import { FiEdit } from "react-icons/fi"
import { SlArrowDown, SlArrowUp } from "react-icons/sl"
import { FaSlidersH } from "react-icons/fa"
import placeholder from "../../assets/v-team-logo.png"
import UserMessages from "./UserMessages"

export default function MessagingPopup() {
  let showMessages = useSelector((state) => state.messenger.showMessages)

  const currentUser = useSelector((state) => state.myProfile.detailsData)
  console.log("user pfp", currentUser.pfp)

  const dispatch = useDispatch()
  if (currentUser.length === 0) {
    return <></>
  } else {
    return (
      <>
        {showMessages ? (
          <div id="messaging-popup-wrapper-full" className="border pointer">
            <div className="top-messenger-wrapper ">
              <div className="d-flex align-items-center">
                <div className="border recommended-user-image ml-1 mr-2">
                  <img src={currentUser?.pfp} alt="avatar" />
                </div>
                <div className="font-weight-bold small-header-text ">Messaging</div>
              </div>
              <div className="d-flex">
                <div className="mr-1 gray-hover icon-wrapper-messenger">
                  <BsThreeDots />
                </div>
                <div className="mr-1 gray-hover icon-wrapper-messenger">
                  <FiEdit />
                </div>
                <div
                  className="mr-1 gray-hover icon-wrapper-messenger"
                  onClick={() => dispatch(collapseMessengerAction())}
                >
                  <SlArrowDown />
                </div>
              </div>
            </div>
            <hr className="messenger-hr" />
            <div id="messenger-search">
              <div>
                {" "}
                <BiSearch className="ml-1" />{" "}
              </div>{" "}
              <div id="messenger-search-text">Search Messages</div>
              <div id="messenger-slider">
                <FaSlidersH />
              </div>
            </div>
            <UserMessages />
          </div>
        ) : (
          <>
            {" "}
            <div id="messaging-popup-wrapper" className="border pointer top-messenger-wrapper">
              <div className="d-flex align-items-center">
                <div className="border recommended-user-image ml-auto mr-2">
                  <img src={currentUser?.pfp} alt="" />
                </div>
                <div className="font-weight-bold  small-header-text">Messaging</div>
              </div>
              <div className="d-flex">
                <div className="mr-1 gray-hover icon-wrapper-messenger">
                  <BsThreeDots />
                </div>
                <div className="mr-1 gray-hover icon-wrapper-messenger">
                  <FiEdit />
                </div>
                <div
                  className="mr-1 gray-hover icon-wrapper-messenger"
                  onClick={() => dispatch(expandMessengerAction())}
                >
                  <SlArrowUp />
                </div>
              </div>
            </div>{" "}
          </>
        )}
      </>
    )
  }
}
