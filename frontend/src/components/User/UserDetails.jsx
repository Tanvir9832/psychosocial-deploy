import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, } from "react-router-dom";
import Post from "../Post/Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loading/Loader";
import { randomUserPostAction } from "../../Actions/post";
// import UserDetailsProfile from "./UserDetailsProfile";

const UserDetails = ({id}) => {

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  if (user?.user?._id === id) {
    navigate("/account");
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(randomUserPostAction(id));
  }, [id]);

  const usersPost = useSelector((state) => state.usersPost);

  const post = usersPost?.posts?.posts;

  return usersPost?.loading ? (
    <Loader />
  ) : (
    <Box>
      <Box
        sx={{
          ml: "3vmax",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {post && post?.length > 0 ? (
          post &&
          post?.map((element) => {
            const { caption, comments, createdAt, image, likes, owner, _id } =
              element;
            return (
              <Post
                key={_id}
                postId={_id}
                caption={caption}
                postImage={image?.url}
                likes={likes}
                ownerImage={image?.url}
                comments={comments}
                createdAt={createdAt}
                ownerName={owner?.name}
                ownerId={owner?._id}
              />
            );
          })
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40vh",
            }}
          >
            {" "}
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              NO POST YET
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserDetails;
