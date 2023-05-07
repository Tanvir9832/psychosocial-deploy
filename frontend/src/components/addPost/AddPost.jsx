import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import {useDispatch}from 'react-redux'
import { addPostAction, userPostAction } from "../../Actions/post";
import "./addPost.css";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addPostAction(caption,image));
    navigate("/account");
    dispatch(userPostAction());
    dispatch(userPostAction());
  };

  return (
    <Box
      sx={{
        height: "90vh",
        width: "100%",
        backgroundColor: "#EEEEEE",
        borderRadius : 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography sx={{ color: "white" }} variant="h4">
          New Post
        </Typography>
        {image && (
          <img
            style={{ height: "100px", width: "100px", alignSelf: "center" }}
            src={image}
            alt="post"
          />
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <textarea
          type="text"
          placeholder="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button sx={{ backgroundColor: "#59CE8F" ,color : "black" , alignSelf  : "center" ,px : 5 }} type="submit">
          POST
        </Button>
      </form>
    </Box>
  );
};

export default AddPost;
