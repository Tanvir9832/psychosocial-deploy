import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Register.css";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Actions/userAction";
import { toast } from "react-toastify";

const Register = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = data;

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    if(password.length >= 8){
      dispatch(registerUser(data));
      setData({ name: "", email: "", password: "" });
    }else{
      toast.error("Password must be at least 8 characters long",{
        position: "bottom-center",
        theme: "dark",
      })
    }
  };
  return (
    <Box sx={{ mt: 15, mx: "auto", maxWidth: 560 }}>
      <form className="register" onSubmit={handleRegister}>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "2rem", sm: "3rem" },
            textShadow:
              "-1px 1px 0 #41ba45,1px 1px 0 #c63d2b,1px -1px 0 #42afac,-1px -1px 0 #c6c23f;",
          }}
          variant="h3"
        >
          PSYCHOSOCIAL
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "#59CE8F",
            textShadow:
              "-1px 1px 0 #41ba45,1px 1px 0 #c63d2b,1px -1px 0 #42afac,-1px -1px 0 #c6c23f;",
          }}
        >
          REGISTER
        </Typography>

        <TextField
          placeholder="Name"
          color="secondary"
          type="text"
          value={name}
          name="name"
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          sx={{ backgroundColor: "white", borderRadius: 2 }}
          focused
          required
        />
        <TextField
          placeholder="Email"
          color="secondary"
          type="email"
          value={email}
          name="email"
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          sx={{ backgroundColor: "white", borderRadius: 2 }}
          focused
          required
        />
        <TextField
          placeholder="Password"
          color="secondary"
          type="password"
          value={password}
          name="password"
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          sx={{ backgroundColor: "white", borderRadius: 2 }}
          focused
          required
        />
        <Button
          type="submit"
          sx={{ color: "#59CE8F", border: "1px solid #59CE8F" }}
        >
          Register
        </Button>
        <Link to="/" className="link">
          <Typography variant="p">GO TO LOGIN PAGE</Typography>
        </Link>
      </form>
    </Box>
  );
};

export default Register;
