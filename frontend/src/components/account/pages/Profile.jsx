import { Avatar, Box, Dialog, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import "./Profile.css";
import "../../Post/Post";
import { myProfileAction } from "../../../Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import User from "../../User/User";
import ChangeProfilePicture from "./ChangeProfilePicture";
import Loader from "../../Loading/Loader";

const Profile = () => {
  const [follower, setFollower] = useState(false);
  const [follwing, setFollowing] = useState(false);
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myProfileAction());
  }, [dispatch]);
  const data = useSelector((state) => state.myProfile);

  const allFollower = data?.data?.followers;
  const allFollowings = data?.data?.following;

  const profilePicture = data?.data?.avatar?.url;

  return data.loading ? (
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
          width: { xs: "80%", md: "60%" },
          p: "4vmax",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column" },
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
              alt={`${data?.data.name}`}
            />
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{ fontSize: "bold" }}
            >{`${data?.data.name}`}</Typography>
          </Box>

          {/* follower following change profile picture and post buttons starts */}

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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
            <Box sx={{ display: "flex", gap: 2 }}>
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

            <Box>
              <button
                onClick={() => setChangeProfilePicture(!changeProfilePicture)}
                className="f_button"
              >
                CHANGE PROFILE PICTURE
              </button>
            </Box>

            <button
              style={{ border: "none", background: "#EEE", cursor: "pointer" }}
            >{`POST ${data?.data.posts && data?.data.posts.length}`}</button>
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
            {allFollower && allFollower.length > 0 ? (
              allFollower.map((elm) => {
                const { avatar, _id, name } = elm;

                return (
                  <User
                    key={_id}
                    userId={_id}
                    name={name}
                    avatar={avatar.url}
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
            {allFollowings && allFollowings.length > 0 ? (
              allFollowings.map((elm) => {
                const { avatar, _id, name } = elm;

                return (
                  <User
                    key={_id}
                    userId={_id}
                    name={name}
                    avatar={avatar.url}
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

        <Dialog
          open={changeProfilePicture}
          onClose={() => setChangeProfilePicture(!changeProfilePicture)}
        >
          <Box>
            <ChangeProfilePicture
              setChangeProfilePicture={setChangeProfilePicture}
            />
          </Box>
        </Dialog>

        {/* dialogs serialy follower following change Profile Picture  ends*/}
      </Box>
    </Box>
  );
};
//!,,avatar
export default Profile;
