import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { loadUser } from "./Actions/userAction";
import Home from "./components/Home/Home";

import Navbar from "./components/Navbar/Navbar";
import NoRoute from "./components/NoRoute/NoRoute";
import Login from "./components/UserSetUp/Login";
import Register from "./components/UserSetUp/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPost from "./components/addPost/AddPost";
import Settings from "./components/settings/Settings";
import ForgotPassword from "./components/UserSetUp/forgotPassword/ForgotPassword";
import ForgotPassFinal from "./components/UserSetUp/forgotPassword/ForgotPassFinal";
// import UserDetails from "./components/User/UserDetails";
import SearchUser from "./components/SearchUser/SearchUser";
import Verify from "./components/emailVerification/Verify";
import FullProfile from "./components/account/FullProfile";
import UserProfile from "./components/User/UserProfile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("token") ;
    if (user) {
    dispatch(loadUser());
    }
  }, [dispatch]);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated && <Navbar />}

        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route
            path="/addpost"
            element={isAuthenticated ? <AddPost /> : <Login />}
          />
          <Route
            path="/account"
            element={isAuthenticated ? <FullProfile /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <NoRoute /> : <Register /> }
          />
          <Route path="/setting" element={isAuthenticated ? <Settings /> : <Login />} />
          <Route path="/forgetPassword" element={isAuthenticated ? <NoRoute /> : <ForgotPassword />} />
          <Route path="/user/reset/:id/:token" element={isAuthenticated ?  <NoRoute /> : <ForgotPassFinal />} />
          <Route path="/getUsersProfile/:id" element={isAuthenticated ? <UserProfile /> : <Login />} />
          <Route path="/search" element={isAuthenticated ? <SearchUser /> : <Login />} />
          <Route path="user/verification/:id/:token" element={isAuthenticated ?  <NoRoute /> : <Verify />} /> 
          <Route path="/*" element={<NoRoute />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
