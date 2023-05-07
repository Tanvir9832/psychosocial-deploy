import { Box, Button, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateComment from "../../LikeComment/Comment/UpdateCommets";
import { commentAction, commentDeleteAction } from "../../../Actions/post";
import User from "../../User/User";

const CommentShowAndDelete = ({
  postId,
  comments,
  setCommentsAndUser,
  ownerId
}) => {
  const [commentUpdate, setCommentUpdate] = useState(false);

  const [newComment, setComment] = useState({ comment: "" });
  let { comment } = newComment;

  const logedInUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  //!comment post function
  const handleSubmitComment = (e) => {
    e.preventDefault();
    dispatch(commentAction(newComment, postId));
    setCommentsAndUser(false);
  };

  //!Delete comment
  const handleClickCommentDelete = (commentId) => {
    dispatch(commentDeleteAction(postId, commentId));
    setCommentsAndUser(false);
  };

  return (
    <Box
      sx={{
        width: { sx: "350px", md: "600px" },
        height: { sx: "350px", md: "600px" },
        backgroundColor: "#001b2b",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        p : 4,
        boxSizing : 'border-box',
        textDecoration: "none",
        alignItems: "center",
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {comments.length > 0 ? (
        <Typography variant="h4" sx={{ color: "white",textAlign: "center", }}>
          {" "}
          Comment{" "}
        </Typography>
      ) : null}

      <form onSubmit={handleSubmitComment} className="comment_from">
        <textarea
          placeholder="comment here ..."
          onChange={(e) =>
            setComment({ ...newComment, [e.target.name]: e.target.value })
          }
          value={comment}
          name="comment"
          className="comment_area"
          cols="40"
          rows="10"
        ></textarea>
        <Button type="submit" sx={{color : "#59CE8F" , border: "1px solid #59CE8F"}}>
          Comment
        </Button>
      </form>
      {comments?.length > 0 ? (
        comments?.map((element) => {
          const { user, comment, _id } = element;

          return (
            <Box
              key={_id}
              sx={{
                backgroundColor: "#001b2b",
                fontWeight: "bold",
                borderRadius : 2,
                p: "2vmax",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background : "rgb(200,238,238)"
              }}
            >
              <Typography sx={{ color: "#000" }} variant="span">
                {comment}
              </Typography>

              <User
                userId={user?._id}
                name={user?.name}
                avatar={user?.avatar?.url}
              />

              <Box
                sx={{ display: "flex", justifyContent: "space-evenly", gap: 1 }}
              >

                {user?._id === logedInUser?._id ? (
                  <button
                    className="comment_btn"
                    onClick={() => setCommentUpdate(!commentUpdate)}
                  >
                    {" "}
                    <UpdateIcon />{" "}
                  </button>
                ) : null}
                { ownerId === logedInUser?._id ? (
                  <button
                    className="comment_btn"
                    onClick={() => handleClickCommentDelete(_id)}
                  >
                    {" "}
                    <DeleteIcon />{" "}
                  </button>
                ) : user?._id === logedInUser?._id ? (
                  <>
              
                       <button
                      className="comment_btn"
                      onClick={() => handleClickCommentDelete(_id)}
                    >
                      {" "}
                      <DeleteIcon />{" "}
                    </button>
                  </>
                ) : null}

                <Dialog
                  open={commentUpdate}
                  onClose={() => setCommentUpdate(!commentUpdate)}
                >
                  <UpdateComment
                    postID={postId}
                    commentID={_id}
                    comment={comment}
                    setCommentUpdate={setCommentUpdate}
                  />
                </Dialog>
              </Box>
            </Box>
          );
        })
      ) : (
        <Typography variant="h4" sx={{ color: "white" }}>
          NO COMMENT YET
        </Typography>
      )}
    </Box>
  );
};

export default CommentShowAndDelete;
