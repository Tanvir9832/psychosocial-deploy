import { Avatar, Box, Button, Dialog, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { followUserAction, singleUserAction } from "../../Actions/userAction";
import { useState } from "react";
import Loader from "../Loading/Loader";

const UserDetailsProfile = ({ id }) => {
  const [follower, setFollower] = useState(false);
  const [follwing, setFollowing] = useState(false);
  const [follow, setFollow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(singleUserAction(id));
    dispatch(singleUserAction(id));
  }, [id]);

  const userMe = useSelector((state) => state.user);
  const myId = userMe?.user?._id;
  const singleUser = useSelector((state) => state.singleUser);

  //!Follow Unfollow handle
  const handleFollowUnfollow = () => {
    setFollow(!follow);

    dispatch(followUserAction(id));
    dispatch(singleUserAction(id));
    dispatch(singleUserAction(id));
  };

  //! Declaration
  const user = singleUser?.data?.user;
  const allFollower = user?.followers;
  const allFollowings = user?.following;
  const profilePicture = user?.avatar?.url;
  const followers = singleUser?.data?.user?.followers
  console.log(user);

  useEffect(() => {
    followers && followers.forEach((followers) => {
      if (followers?._id === myId) {
        setFollow(true);
      }
    });
  },[followers]);

  return singleUser.loading ? (
    <Loader />
  ) : (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          mt: "1.3vmax",
          m: "2.5%",
          backgroundColor: "rgb(200,238,238)",
          boxShadow: 6,
          width: { xs: "87%", md: "60%" },
          p: "4vmax",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Avatar
              src={profilePicture}
              sx={{
                width: "9vmax",
                height: "9vmax",
                border: "1px solid #fff",
                boxShadow: 20,
              }}
              alt={`${user?.name}`}
            />
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{ fontSize: "bold" }}
            >{`${user?.name}`}</Typography>
          </Box>
          <Box>
            <Button
              onClick={handleFollowUnfollow}
              sx={
                follow
                  ? { border: "none", boxShadow: 5, color: "red" }
                  : { border: "none", boxShadow: 5, color: "#59CE8F" }
              }
            >
              {follow ? "UNFOLLOW" : "FOLLOW"}
            </Button>
          </Box>

          {/* follower following change profile picture and post buttons starts */}

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setFollower(!follower)}
                className="f_button"
              >
                FOLLOWERS
              </button>
              <Typography variant="p">{`${
                allFollower && allFollower?.length
              }`}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setFollowing(!follwing)}
                className="f_button"
              >
                FOLLOWING
              </button>
              <Typography variant="p">{`${
                allFollowings && allFollowings?.length
              }`}</Typography>
            </Box>

            <Button
              sx={{
                display: "flex",
                color: "#000",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >{`POST ${user?.posts && user?.posts.length}`}</Button>
          </Box>

          {/* follower following and post buttons starts */}
        </Stack>

        {/* dialogs serialy follower following  starts*/}

        <Dialog open={follower} onClose={() => setFollower(!follower)}>
          <Box
            sx={{
              height: "60vh",
              p: 8,
              overflow: "auto",
              textAlign: "center",
              width: "20vh",
              backgroundColor: "#001b2b",
            }}
          >
            {allFollower && allFollower?.length > 0 ? (
              allFollower?.map((elm) => {
                const { avatar, _id, name } = elm;

                return (
                  <User
                    key={_id}
                    userId={_id}
                    name={name}
                    avatar={avatar?.url}
                  />
                );
              })
            ) : (
              <Typography variant="h6" sx={{ color: "white" }}>
                No Follower
              </Typography>
            )}
          </Box>
        </Dialog>

        <Dialog open={follwing} onClose={() => setFollowing(!follwing)}>
          <Box
            sx={{
              height: "60vh",
              p: 8,
              overflow: "auto",
              textAlign: "center",
              width: "20vh",
              backgroundColor: "#001b2b",
            }}
          >
            {allFollowings && allFollowings?.length > 0 ? (
              allFollowings?.map((elm) => {
                const { avatar, _id, name } = elm;

                return (
                  <User
                    key={_id}
                    userId={_id}
                    name={name}
                    avatar={avatar?.url}
                  />
                );
              })
            ) : (
              <Typography variant="h6" sx={{ color: "white" }}>
                No Following
              </Typography>
            )}
          </Box>
        </Dialog>

        {/* dialogs serialy follower following change Profile Picture  ends*/}
      </Box>
    </Box>
  );
};

export default UserDetailsProfile;
