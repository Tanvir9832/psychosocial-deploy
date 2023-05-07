import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "./forgrtPassword.css";
import { forgetPassAction } from "../../../Actions/userAction"
import { useDispatch } from "react-redux";

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const [email,setEmail]= useState("");

    const handlerEmail = (e)=>{
        e.preventDefault();
        dispatch(forgetPassAction({email : email}));
    }

  return (
    <Box sx={{ height: "100vh", width: "100%", mt: 20 }}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#001b2b",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1vmax",
          p: "10vmax",
          maxWidth: "500px",
          m: "auto",
          textAlign : 'center'
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "3rem",
            textShadow:
              "-1px 1px 0 #41ba45,1px 1px 0 #c63d2b,1px -1px 0 #42afac,-1px -1px 0 #c6c23f;",
          }}
          variant="h3"
        >
          PSYCHOSOCIAL
        </Typography>
        <Typography
          sx={{
            color: "white",
            textShadow:
              "-1px 1px 0 #41ba45,1px 1px 0 #c63d2b,1px -1px 0 #42afac,-1px -1px 0 #c6c23f;",
          }}
          variant="h6"
        >
          FORGET PASSWORD ???
        </Typography>
        <Typography
          sx={{
            color: "white",
            textShadow:
              "-1px 1px 0 #41ba45,1px 1px 0 #c63d2b,1px -1px 0 #42afac,-1px -1px 0 #c6c23f;",
          }}
          variant="p"
        >
          ENTER YOUR EMAIL ADDRESS
        </Typography>
        <form onSubmit={handlerEmail} className="forgrtPassForm">
          <TextField
            sx={{ backgroundColor: "white" }}
            type="email"
            placeholder="Email..."
            onChange={(e)=>setEmail(e.target.value)}
          />
          <Button type="submit" variant="contained">submit</Button>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
