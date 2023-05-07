import { Avatar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./USer.css";
const User = ({ userId, name, avatar }) => {
  return (
    <Link
      style={{ alignSelf: "start" ,marginLeft : {xs : "0px" , md : "5px"  } }}
      className="user"
      to={`/getUsersProfile/${userId}`}
    >
      <Avatar sx={{boxShadow : 1}} alt={`${name}`} src={`${avatar}`}  />
      <Typography sx={{p:0.3, color: "#59CE8F" ,fontWeight: "bold",letterSpacing :0.1}}>{name}</Typography>
    </Link>
  );
};

export default User;
