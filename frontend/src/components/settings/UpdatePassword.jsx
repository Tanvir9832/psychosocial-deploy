import React from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./Settings.css";
import { updatePasswordAction } from '../../Actions/userAction';


const UpdatePassword = ({setUpdatePawssord,}) => {
  const [data,setData] =useState({newPassword : "" ,currentPassword : "",confirmPassword : ""});
  const {newPassword,currentPassword,confirmPassword} = data;

  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePasswordAction(data));
    setUpdatePawssord(false);
  };

  return (
    <Box sx={{ backgroundColor: "#001b2b" }}>
      <form className="updateProfile" onSubmit={handleSubmit}>
        <Typography sx={{ textAlign: "center" }} variant="h4">
          UPDATE PASSWORD
        </Typography>

        <TextField
          type="password"
          placeholder="New Password..."
          name="newPassword"
          value={newPassword}
          onChange={(e)=>setData({...data, [e.target.name] : e.target.value })}
          sx={{ background: "white", borderRadius: 1 }}
        />
        <TextField
          type="password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e)=>setData({...data, [e.target.name] : e.target.value })}
          sx={{ background: "white", borderRadius: 1 }}
        />
        <TextField
          type="password"
          placeholder="Current Password..."
          name="currentPassword"
          value={currentPassword}
          onChange={(e)=>setData({...data, [e.target.name] : e.target.value })}
          sx={{ background: "white", borderRadius: 1 }}
        />

        <Button sx={{color : "#59CE8F" , border: "1px solid #59CE8F"}} type="submit">
          Update
        </Button>
      </form>
    </Box>
  )
}

export default UpdatePassword