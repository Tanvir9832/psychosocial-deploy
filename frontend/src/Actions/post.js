import axios from "axios"; //
import { toast } from "react-toastify";

//!post for Home components starts
export const postAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "postRequest",
    });

    const data = await axios.get("/api/v2/posts", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch({
      type: "postSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "postFailure",
      payload: error?.response?.data?.message,
    });
  }
};
//!post for Home components ends

//!Like starts
export const likeAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });
    const data = await axios.get(`/api/v1/post/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success(data?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
    dispatch({
      type: "likeSuccess",
      payload: data?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error?.response?.data?.message,
    });

    toast.error("Like Failed", {
      position: "bottom-center",
      theme: "dark",
    });
  }
};

//!Like ends

//! comment starts
//!comment
export const commentAction = (comment, id) => async (dispatch) => {
  try {
    dispatch({
      type: "commentRequest",
    });

    const data = await axios.post(`/api/v1/comment/${id}`, comment, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: "commentSuccess",
      payload: data?.data?.message,
    });
    toast.success(data?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    dispatch({
      type: "commentFailure",
      payload: error?.response?.data?.message,
    });
    toast.error("Comment Failed", {
      position: "bottom-center",
      theme: "dark",
    });
  }
};

//!comment delete
export const commentDeleteAction = (postId, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "commentDeleteRequest",
    });
    const data = await axios.delete(`/api/v1/comment/${postId}/${commentId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch({
      type: "commentDeleteSuccess",
      payload: data,
    });

    toast.success(data?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    toast.error("Comment is not deleted", {
      position: "bottom-center",
      theme: "dark",
    });
    dispatch({
      type: "commentDeleteFailure",
      payload: error?.response?.data?.message,
    });
  }
};

//!comment update
export const commentUpdateAction =
  (postid, commentid, data) => async (dispatch) => {
    try {
      dispatch({
        type: "commentUpdateRequest",
      });
      const res = await axios.put(
        `/api/v1/comment/${postid}/${commentid}`,
        data,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res?.data?.message, {
        position: "bottom-center",
        theme: "dark",
      });
      dispatch({
        type: "commentUpdateSuccess",
        payload: res?.data?.message,
      });
    } catch (error) {
      toast.error("Comment is not updated", {
        position: "bottom-center",
        theme: "dark",
      });
      dispatch({
        type: "commentUpdateFailure",
        payload: error?.response?.data?.message,
      });
    }
  };

//!comment ends

//!MY POST

export const userPostAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "usersPostsRequest",
    });
    const data = await axios.get("/api/v1/user/Post", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch({
      type: "usersPostSuccess",
      payload: data?.data?.data,
    });
  } catch (error) {
    dispatch({
      type: "usersPostsFailure",
      payload: error?.response?.data?.message,
    });
  }
};

//!random User post action

export const randomUserPostAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "randomUsersPostRequest",
    });
    const res = await axios.get(`/api/v1/user/Post/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // let result = res?.data;


    dispatch({
      type: "randomUsersPostSuccess",
      payload: res?.data,
    });


  } catch (error) {
    dispatch({
      type: "randomUsersPostFailure",
      payload: error?.response?.data,
    });
  }
};

//!add post action
export const addPostAction = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "addPostRequest",
    });
    const res = await axios.post(
      "api/v1/post/upload",
      {
        caption,
        image,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "addPostSuccess",
      payload: res,
    });


    toast.success(res?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    dispatch({
      type: "addPostFailure",
      payload: error?.response?.data?.message,
    });
    toast.error("Post failed", {
      position: "bottom-center",
      theme: "dark",
    });
  }
};

export const updatePostAction = (id, caption) => async (dispatch) => {
  try {
    dispatch({
      type: "updatePostRequest",
    });
    const res = await axios.put(
      `api/v1/post/${id}`,
      { caption },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch({
      type: "updatePostSuccess",
      payload: res,
    });
    toast.success(res?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    dispatch({
      type: "updatePostFailure",
      payload: error?.response?.data?.message,
    });
    toast.error("Post didn't updated", {
      position: "bottom-center",
      theme: "dark",
    });
  }
};

export const postDeleteAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "postDeleteRequest",
    });
    const res = await axios.delete(`/api/v1/post/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: "postDeleteSuccess",
      payload: res,
    });
    toast.success(res?.data?.message, {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    dispatch({
      type: "postDeleteFailure",
      payload: error?.response?.data?.message,
    });
    toast.error("Post didn't deleted", {
      position: "bottom-center",
      theme: "dark",
    });
  }
};
