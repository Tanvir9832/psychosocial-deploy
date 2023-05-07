import { Avatar, Box, Button, Dialog, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  likeAction,
  postAction,
  postDeleteAction,
  userPostAction,
} from "../../Actions/post";
import CommentShowAndDelete from "../LikeComment/Comment/CommentShowAndDelete";
import "./Post.css";
import Like from "../LikeComment/Like/Like";
import PostUpdate from "./PostUpdate";

const Post = ({
  postId,
  caption,
  postImage,
  likes,
  comments,
  ownerImage,
  ownerId,
  ownerName,
  createdAt,
}) => {
  //!likes
  const [liked, setLiked] = useState(false);
  const [allUsersWhosLiked, setAllUsersWhosLiked] = useState(false);

  //!comments
  const [commentsAndUser, setCommentsAndUser] = useState(false);

  //!updateDelete
  const [updateDelete, setUpdateDelete] = useState(false);

  const logedInUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  //! postDelete function
  const postDelete = () => {
    dispatch(postDeleteAction(postId));
    dispatch(userPostAction());
    dispatch(userPostAction());
  };

  //!like function
  const likeFunction = () => {
    setLiked(!liked);
    dispatch(likeAction(postId));
  };

  useEffect(() => {
    likes?.forEach((element) => {
      if (element?._id === logedInUser?._id) {
        setLiked(true);
      }
    });
  }, [likes, logedInUser?._id]);

  return (
    <Box className="post" sx={{ p: 1 }}>
      <Box className="postHeader">
        {ownerId === logedInUser?._id ? (
          <button
            className="moreVertIcon"
            onClick={() => setUpdateDelete(!updateDelete)}
          >
            {" "}
            <MoreHorizIcon />{" "}
          </button>
        ) : null}
      </Box>

      {postImage && <img src={postImage} alt="Post" />}

      <Box className="postCaption">
        <Typography
          sx={{
            fontWeight: 100,
            color: "#000",
            overflow: "auto",
            alignSelf: "center",
            fontSize: 17,
          }}
          variant="span"
        >
          {caption}
        </Typography>
      </Box>
      <Box sx={{ alignSelf: "self-start", mx: "2.5%" }}>
        <Typography sx={{ opacity: "0.5" }} variant="p">
          {createdAt.slice(0, 10).split("-").reverse().join("/")}
        </Typography>
      </Box>
      <Box className="ownerDetails">
        <Avatar
          src={ownerImage}
          alt={ownerName}
          sx={{
            height: { xs: "3vmax", md: "2.3vmax" },
            width: { xs: "3vmax", md: "2.3vmax" },
          }}
        />
        <Link className="ownerIdLink" to={`/getUsersProfile/${ownerId}`}>
          <Typography>{ownerName}</Typography>
        </Link>
      </Box>

      <Box className="likesAndComment">
        <button
          className="likes"
          onClick={() => setAllUsersWhosLiked(!allUsersWhosLiked)}
        >
          <Typography>
            {" "}
            {`${
              likes.length === 0
                ? "No Like"
                : likes.length > 1
                ? `${likes.length} Likes`
                : "1 Like"
            }`}
          </Typography>
        </button>
        <button
          className="comment"
          onClick={() => setCommentsAndUser(!commentsAndUser)}
        >
          <Typography>
            {" "}
            {`${
              comments.length === 0
                ? "No Comment"
                : comments.length > 1
                ? `${comments.length} Comments`
                : "1 Comment"
            }`}
          </Typography>
        </button>
      </Box>

      <Box sx={{ display: "flex", mb: 2, ml: { xs: -1, sm: 2 } }}>
        <Button className="post_Icon" onClick={likeFunction}>
          {liked ? (
            <ThumbDownAltIcon sx={{ color: "red" }} />
          ) : (
            <ThumbUpIcon sx={{ color: "#59CE8F" }} />
          )}
        </Button>

        <Button
          className="post_Icon"
          onClick={() => setCommentsAndUser(!commentsAndUser)}
        >
          <CommentIcon sx={{ color: "#59CE8F" }} />
        </Button>

        {ownerId === logedInUser._id ? (
          <Button className="post_Icon">
            <DeleteIcon onClick={postDelete} sx={{ color: "#59CE8F" }} />
          </Button>
        ) : null}
      </Box>

      <Dialog
        open={allUsersWhosLiked}
        onClose={() => setAllUsersWhosLiked(!allUsersWhosLiked)}
      >
        <Like likes={likes} />
      </Dialog>

      {/* COMMENT SHOW AND DELETE */}

      <Dialog
        open={commentsAndUser}
        onClose={() => setCommentsAndUser(!commentsAndUser)}
      >
        <CommentShowAndDelete
          setCommentsAndUser={setCommentsAndUser}
          postId={postId}
          ownerId={ownerId}
          comments={comments}
        />
      </Dialog>

      {/* POST UPDATE*/}

      <Dialog
        open={updateDelete}
        onClose={() => setUpdateDelete(!updateDelete)}
      >
        <Box
          sx={{
            backgroundColor: "#001b2b",
            maxWidth: "600px",
            height: "400px",
            p: 5,
            color: "white",
            overflow: "auto",
          }}
        >
          <PostUpdate id={postId} setUpdateDelete={setUpdateDelete} />
        </Box>
      </Dialog>
    </Box>
  );
};

export default Post;
