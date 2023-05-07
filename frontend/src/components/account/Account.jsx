import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userPostAction } from "../../Actions/post";
import Loader from "../Loading/Loader";
import Post from "../Post/Post";

//!

const Account = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userPostAction());

  }, [dispatch]);


  const usersPost = useSelector((state) => state.usersPost);
  let post = usersPost?.posts;
 

  return usersPost.loading ? (
    <Loader />
  ) : (
    <Stack      

    >
      <Box
        sx={{
          ml: "3vmax",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {post.length > 0 ? (
          post?.map((element) => {
            const { comments, createdAt, image, likes, owner, _id } = element;

            return (
              <Post
                key={_id}
                postId={_id}
                caption={element?.caption}
                postImage={image.url}
                likes={likes}
                comments={comments}
                ownerImage={owner?.avatar?.url}
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
    </Stack>
  );
};

export default Account;
