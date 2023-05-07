import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import User from "../User/User";
import Post from "../Post/Post";
import { postAction } from "../../Actions/post";
import { getAllUserAction } from "../../Actions/userAction";
import Loader from "../Loading/Loader";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postAction());
    dispatch(getAllUserAction());
  }, [dispatch]);

  const getState = useSelector((state) => state);

  //!From State
  const posts = getState.followingsPost;
  const allUserNewArray = getState.allusers?.user;
  const postArray = posts.posts;

  const matches = useMediaQuery("(max-width:540px)");

  return posts.loading ? (
    <Loader />
  ) : (
    <Box
      sx={{
        backgroundColor: "#EEEEEE",
        maxWidth: "100%",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1.5fr ", md: "300px 1fr" },
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#EEE",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          my: 2,
          gap: 1,
          boxSizing: "border-box",
          p: 2,
          boxShadow: 3,
          textDecoration: "none",
          alignItems: "center",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {matches ? (
          <Typography
            variant="h5"
            sx={{ textAlign: "center", color: "black", fontWeight: "bold" }}
          >
            FIND FRIENDS
          </Typography>
        ) : (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", color: "black", fontWeight: "bold" }}
          >
            FIND FRIENDS
          </Typography>
        )}
        {allUserNewArray && allUserNewArray.length > 0 ? (
          allUserNewArray.map((user) => {
            return (
              <User
                key={user?._id}
                userId={user?._id}
                name={user?.name}
                avatar={user?.avatar?.url}
              />
            );
          })
        ) : (
          <Typography sx={{ color: "white" }} variant="h4">
            NO USER YET
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          backgroundColor: "#EEEEEE",
          boxShadow: 3,
          my: 2,
          mx: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {postArray && postArray.length > 0 ? (
          postArray.map((post, i) => {
            return (
              <Post
                key={post?._id}
                postId={post?._id}
                caption={post?.caption}
                postImage={post?.image.url}
                likes={post?.likes}
                comments={post?.comments}
                createdAt={post?.createdAt}
                ownerImage={post?.owner?.avatar?.url}
                ownerName={post?.owner?.name}
                ownerId={post?.owner?._id}
              />
            );
          })
        ) : (
          <Typography variant="h4">NO POST YET</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;
