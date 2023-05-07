import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMyProfileAccount } from '../../Actions/userAction';
import './Settings.css'

const DeleteMyProfie = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({ email: "", password: "" });
  const { email, password } = data;

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteMyProfileAccount(data));
  };
  return (
    <Box>
      <form className="delete_profile_form" onSubmit={deleteHandler}>
        <Typography
          sx={{
            color: "white",
            fontSize:{xs :  "4vmax" ,sm : "3vmax"},
            textShadow:
              "-1px 1px 0 #41ba45,1px 1px 0 #c63d2b,1px -1px 0 #42afac,-1px -1px 0 #c6c23f;",
          }}
          variant="h4"
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
          DELETE PROFILE
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
          sx={{color : "#59CE8F" , border: "1px solid #59CE8F"}}
        >
          DELETE
        </Button>
      </form>
    </Box>
  )
}

export default DeleteMyProfie