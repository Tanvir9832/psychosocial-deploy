import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../Actions/userAction";
import "./login.css";

const Login = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({ email: "", password: "" });
  const { email, password } = data;

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <Box sx={{ mt: 15 }}>
      <form className="login_form" onSubmit={loginHandler}>
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
          LOG IN
        </Typography>

        <TextField
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          name="email"
          value={email}
          sx={{ backgroundColor: "white", borderRadius: 2 }}
          type="email"
          placeholder="Email"
          color="secondary"
          required
          focused
        />
        <TextField
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          name="password"
          value={password}
          sx={{ backgroundColor: "white", borderRadius: 2 }}
          type="password"
          placeholder="Password"
          color="secondary"
          required
          focused
        />

        <Button
          type="submit"
          sx={{ color: "#59CE8F", border: "1px solid #59CE8F" }}
        >
          LOG IN
        </Button>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Link to="/register" className="link">
            <Typography>Create Account</Typography>
          </Link>
          <Link to="/forgetPassword" className="link">
            <Typography>Forget Password</Typography>
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
