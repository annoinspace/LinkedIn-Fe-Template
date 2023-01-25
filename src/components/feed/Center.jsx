import MainFeedSectionWithPosts from "./MainFeedSectionWithPosts";
import StartAPost from "./StartAPost";
import { useSelector } from "react-redux";

const Center = () => {
  return (
    <>
      <StartAPost />
      <div>
        <hr />
      </div>
      <MainFeedSectionWithPosts />
    </>
  );
};

export default Center;
