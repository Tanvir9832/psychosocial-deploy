import { configureStore } from "@reduxjs/toolkit";
import {
  addPostReducer,
  postLike,
  postReducer,
  usersPosts,
} from "./Reducers/post";
import {
  getAllUserReducer,
  myProfilePictureUpload,
  myProfileReducer,
  profileUpdate,
  singleUserReducer,
  userReducer,
} from "./Reducers/user";

const store = configureStore({
  reducer: {
    user: userReducer,
    followingsPost: postReducer,
    allusers: getAllUserReducer,
    like: postLike,
    usersPost: usersPosts,
    myProfile: myProfileReducer,
    post: addPostReducer,
    profilePicture: myProfilePictureUpload,
    profileUpdate : profileUpdate,
    singleUser: singleUserReducer,
  },
});

export default store;
