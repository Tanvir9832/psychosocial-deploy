import {
  Box,
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UpdatePassword from "./UpdatePassword";
import UpdateProfile from "./UpdateProfile";
import DeleteMyProfie from "./DeleteMyProfie";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [updatePassword, setUpdatePawssord] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const navigate = useNavigate();

  const logOutFunction = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <Box
      sx={{
        backgroundColor: "#EEEEEE",
        height: { xs: "86vh", sm: "95vh" },
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: "-4vmax",
        boxShadow: 10,
      }}
    >
      <Box sx={{ background: "#001b2b", p: 15, boxShadow: 2 }}>
        <Typography
          sx={{ textAlign: "center", color: "#fff", fontSize: "3vmax" }}
          variant="h4"
        >
          SETTING
        </Typography>
        <Stack sx={{ mt: 2 }}>
          <List>
            <ListItem>
              <ListItemButton
                onClick={() => setUpdateProfile(!updateProfile)}
                sx={{ border: "1px solid #59CE8F" }}
              >
                <ListItemText
                  sx={{ color: "#59CE8F", fontWeight: "bold" }}
                  primary="UPDATE PROFILE"
                />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                onClick={() => setUpdatePawssord(!updatePassword)}
                sx={{ border: "1px solid #59CE8F" }}
              >
                <ListItemText
                  sx={{ color: "#59CE8F", fontWeight: "bold" }}
                  primary="UPDATE PASSWORD"
                />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                sx={{ border: "1px solid #59CE8F" }}
                onClick={logOutFunction}
              >
                <ListItemText sx={{ color: "#59CE8F" }} primary="LOG OUT" />
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ mt: 5 }}>
              <ListItemButton
                onClick={() => setDeleteProfile(!deleteProfile)}
                sx={{ border: "1px solid #59CE8F" }}
              >
                <ListItemText sx={{ color: "red" }} primary="DELETE PROFILE" />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Box>

      <Dialog
        open={updateProfile}
        onClose={() => setUpdateProfile(!updateProfile)}
      >
        <UpdateProfile setUpdateProfile={setUpdateProfile} />
      </Dialog>

      <Dialog
        open={updatePassword}
        onClose={() => setUpdatePawssord(!updatePassword)}
      >
        <UpdatePassword setUpdatePawssord={setUpdatePawssord} />
      </Dialog>

      <Dialog
        open={deleteProfile}
        onClose={() => setDeleteProfile(!deleteProfile)}
      >
        <DeleteMyProfie setDeleteProfile={setDeleteProfile} />
      </Dialog>
    </Box>
  );
};

export default Settings;
