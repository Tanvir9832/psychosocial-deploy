import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentUpdateAction } from "../../../Actions/post";

import "./comment.css";

const Updatecommets = ({ postID, commentID, setCommentUpdate ,comment }) => {
  const dispatch = useDispatch();
  const [data, setUpdateComment] = useState({ updatedComment: "" });
  const { updatedComment } = data;

  const handleUpdateForm = (e) => {
    e.preventDefault();
    dispatch(commentUpdateAction(postID, commentID, data));
    setCommentUpdate(false);
  };
  return (
    <form className="update_comment_form">
      <textarea
        placeholder="update your comment ..."
        className="comment_area"
        cols="40"
        rows="10"
        value={updatedComment}
        name="updatedComment"
        onChange={(e) =>
          setUpdateComment({ ...data, [e.target.name]: e.target.value })
        }
      ></textarea>
      <Button
        type="submit"
        variant="outlined"
        onClick={handleUpdateForm}
        sx={{color : "#59CE8F" , border: "1px solid #59CE8F"}}
      >
        Update
      </Button>
    </form>
  );
};

export default Updatecommets;
