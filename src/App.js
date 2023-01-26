import ExperienceComponent from "./components/center/ExperienceComponent"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import ResourcesSinglePageComponent from "./components/center/ResourcesSinglePageComponent.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MyProfile from "./components/global/MyProfile"
import CustomNavbar from "./components/global/CustomNavbar.jsx"
import { useSelector, useDispatch } from "react-redux"
import { showUserSearchAction } from "./redux/actions"
import MessagingPopup from "./components/global/MessagingPopup"
import Feed from "./components/feed/Feed"
import SearchDisplay from "./components/global/SearchDisplay.jsx"
import OtherUser from "./components/global/OtherUser"
import LoginPage from "./components/login/LoginPage"
import Network from "./components/network/Network"
import SignUp from "./components/sign-up/SignUp"
import MyConnections from "./components/network/MyConnections"

function App() {
  let showSearchResults = useSelector((state) => state.showUsers.show)
  const dispatch = useDispatch()
  return (
    <BrowserRouter>
      <div className="App">
        <CustomNavbar />
        {showSearchResults && (
          <>
            <SearchDisplay onClick={() => dispatch(showUserSearchAction())} />
          </>
        )}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/me" element={<MyProfile />} />
          <Route path="/network" element={<Network />} />
          <Route path="/mynetwork" element={<MyConnections />} />
          <Route path="/details/resources" element={<ResourcesSinglePageComponent />} />
          <Route path="/editexperiences" element={<ExperienceComponent />} />
          <Route path="/home" element={<Feed />} />
          <Route path="/profile/:id" element={<OtherUser />} />
        </Routes>
      </div>
      <MessagingPopup />
    </BrowserRouter>
  )
}

export default App
