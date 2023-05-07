import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { forgetPassFinalAction } from "../../../Actions/userAction";

const ForgotPassFinal = () => {
  const dispatch = useDispatch();
  const { id, token } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({ newPassword: "", confirmPassword: "" });
  const { newPassword, confirmPassword } = data;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPassFinalAction(data, id, token));
    navigate('/');
  };

  return (
    <Stack sx={{ backgroundColor: "#001b2b" ,maxWidth : "500px" , m : "auto" , mt : "50px" }}>
      <form className="updateProfile" onSubmit={handleSubmit}>
        <Typography sx={{ textAlign: "center" }} variant="h4">
          Forget Password
        </Typography>

        <TextField
          type="password"
          placeholder="New Password..."
          name="newPassword"
          value={newPassword}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          sx={{ background: "white", borderRadius: 1 }}
        />
        <TextField
          type="password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          sx={{ background: "white", borderRadius: 1 }}
        />

        <Button variant="contained" type="submit">
          Update
        </Button>
      </form>
    </Stack>
  );
};

export default ForgotPassFinal;
