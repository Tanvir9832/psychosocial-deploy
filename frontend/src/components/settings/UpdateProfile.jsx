import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfileAction } from "../../Actions/userAction";
import "./Settings.css";

const UpdateProfile = ({setUpdateProfile}) => {

    const [data,setData] =useState({name : "" ,email : ""});
    const {name,email} = data;


    const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileAction(data));
    setUpdateProfile(false);
  };
  return (
    <Box sx={{ backgroundColor: "#001b2b" }}>
      <form className="updateProfile" onSubmit={handleSubmit}>
        <Typography sx={{ textAlign: "center" }} variant="h4">
          UPDATE YOUR PROFILE
        </Typography>

        <TextField
          type="text"
          placeholder="Name..."
          name="name"
          value={name}
          onChange={(e)=>setData({...data, [e.target.name] : e.target.value })}
          sx={{ background: "white", borderRadius: 1 }}
        />
        <TextField
          type="email"
          placeholder="Email..."
          name="email"
          value={email}
          onChange={(e)=>setData({...data, [e.target.name] : e.target.value })}
          sx={{ background: "white", borderRadius: 1 }}
        />

        <Button sx={{color : "#59CE8F" , border: "1px solid #59CE8F"}} type="submit">
          Update
        </Button>
      </form>
    </Box>
  );
};

export default UpdateProfile;
