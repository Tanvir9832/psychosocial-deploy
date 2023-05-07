import { toast } from "react-toastify";
import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const { data } = await axios.post("/api/v2/login", { email, password });

    localStorage.setItem("token", data.token);
    dispatch({
      type: "loginSuccess",
      payload: data?.user,
    });

    toast.success(data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    dispatch({
      type: "loginFailure",
      payload: error?.response?.data?.message,
    });
    toast.error(error?.response?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });
    const data = await axios.get("/api/v2/myProfile", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
    dispatch({
      type: "loadUserSuccess",
      payload: data?.data?.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFailure",
      payload: error?.response?.data,
    });
  }
};

export const registerUser = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "registerRequest",
    });

    const res = await axios.post("/api/v2/signin", data);
    dispatch({
      type: "registerSuccess",
      payload: res?.data,
    });
    toast.success(
      res?.data?.message || "Registration Successful ! Please check your email",
      {
        position: "bottom-center",
        theme: "dark",
      }
    );
  } catch (error) {
    dispatch({
      type: "registerFailure",
      payload: error?.response?.data,
    });

    toast.error(error?.response?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  }
};

export const getAllUserAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUserRequest",
    });
    const data = await axios.get("/api/v2/getAllUsers", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: "getAllUserSuccess",
      payload: data?.data?.newUser,
    });
  } catch (error) {
    dispatch({
      type: "getAllUserFailure",
      payload: error?.response?.data,
    });
  }
};

//! myProfile

export const myProfileAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "myProfileRequest",
    });
    const res = await axios.get("/api/v2/myProfile", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch({
      type: "myProfileSuccess",
      payload: res?.data?.user,
    });
  } catch (error) {
    dispatch({
      type: "myProfileFailure",
      payload: error?.response?.data,
    });
  }
};

//! User Profile Picture

export const profilePictureAction = (image, caption) => async (dispatch) => {
  try {
    dispatch({
      type: "myProfilePictureUploadRequest",
    });
    const res = await axios.post(
      "api/v2/changeProfilePicture",
      { caption, image },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    );
    dispatch({
      type: "myProfilePictureUploadSuccess",
      payload: res?.data,
    });
    toast.success(res?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    dispatch({
      type: "myProfilePictureUploadFailure",
      payload: error?.response?.data,
    });
    toast.error("Post didn't deleted", {
      position: "bottom-center",
      theme: "dark",
    });
  }
};

//!Update PROFILE

export const updateProfileAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "profileUpdateRequest",
    });
    const res = await axios.put("/api/v2/update/profile", data, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: "profileUpdateSuccess",
      payload: res?.data,
    });
    toast.success(res?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    toast.error(error?.response?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
    dispatch({
      type: "profileUpdateFailure",
      payload: error?.response?.data,
    });
  }
};

export const updatePasswordAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "passwordUpdateRequest",
    });
    const res = await axios.put("/api/v2/update/password", data, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: "passwordUpdateSuccess",
      payload: res?.data,
    });
    toast.success(res?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    dispatch({
      type: "passwordUpdateFailure",
      payload: error?.response?.data,
    });
    toast.error(error?.response?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  }
};

export const deleteMyProfileAccount = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteMyProfileRequest",
    });
    const res = await axios.post("/api/v2/profile/delete", data, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch({
      type: "deleteMyProfileSuccess",
      payload: res?.data,
    });
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
    dispatch({
      type: "deleteMyProfileFailure",
      payload: error?.response?.data,
    });
  }
};

export const forgetPassAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "forgetPasswordRequest",
    });

    const res = await axios.post("/api/v2/forget-password", data);

    dispatch({
      type: "forgetPasswordSuccess",
      payload: res?.data,
    });
    toast.success(res?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    toast.error(error?.response?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
    dispatch({
      type: "forgetPasswordFailure",
      payload: error?.response?.data,
    });
  }
};

export const forgetPassFinalAction = (data, id, token) => async (dispatch) => {
  try {
    dispatch({
      type: "forgetPasswordFinalRequest",
    });
    const res = await axios.post(`/api/v2/forget-password/${id}/${token}`, data);

    dispatch({
      type: "forgetPasswordFinalSuccess",
      payload: res?.data,
    });
    toast.success(res?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    toast.error(error?.response?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
    dispatch({
      type: "forgetPasswordFianlFailure",
      payload: error?.response?.data,
    });
  }
};

export const singleUserAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "singleUserRequest",
    });

    const res = await axios.get(`/api/v2/getUsersProfile/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch({
      type: "singleUserSuccess",
      payload: res?.data,
    });
  } catch (error) {
    dispatch({
      type: "singleUserFailure",
      payload: error?.response?.data,
    });
  }
};

//!Follow Unfollow Action

export const followUserAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    });
    const res = await axios.get(`/api/v2/follow/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: "followUserSuccess",
      payload: res?.data,
    });
    toast.success(res?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    toast.error(error?.response?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
    dispatch({
      type: "followUserFailure",
      payload: error?.response?.data,
    });
  }
};

export const searchingUserAction =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "searchUserRequest",
      });
      const res = await axios.get(`/api/v2/searching/?data=${name}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({
        type: "searchUserSuccess",
        payload: res?.data,
      });
    } catch (error) {
      dispatch({
        type: "searchUserFailure",
        payload: error?.response?.data,
      });
    }
  };

export const emailVerification = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: "emailVerificationRequest",
    });

    const res = await axios.get(`/api/v2/user/verification/${id}/${token}`);

    dispatch({
      type: "emailVerificationSuccess",
      payload: res?.data,
    });

    toast.success(res?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    dispatch({
      type: "emailVerificationFailure",
      payload: error?.response?.data,
    });
    toast.error(error?.response?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  }
};
