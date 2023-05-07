import React from "react";
import "./Navbar.css";
import { AppBar, Toolbar, Box, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = () => {
  const matches = useMediaQuery("(max-width:700px)");
  return (
    <AppBar sx={{ position: "sticky" ,boxShadow : 2,}}>
      <Toolbar
        sx={
          matches
            ? {
                backgroundColor: "#1c242a",
                p: "3vmax",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }
            : {
                backgroundColor: "#1c242a",
                p: "1.3vmax",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }
        }
      >
        <Box
          sx={{
            fontSize: "2.5rem",
            textShadow:
              "-1px 1px 0 #41ba45,1px 1px 0 #c63d2b,1px -1px 0 #42afac,-1px -1px 0 #c6c23f;",
          }}
        >
          PSYCHOSOCIAL
        </Box>
        <Box
          sx={
            matches
              ? {
                  display: "flex",
                  width: "35%",
                  gap: 5,
                  justifyContent: "space-around",
                }
              : {
                  display: "flex",
                  width: "35%",
                  justifyContent: "space-around",
                }
          }
        >
          <Link className="navbar_link home" to="/">
            <HomeIcon sx={{ fontSize: "2rem" }} />
          </Link>
          <Link className="navbar_link add" to="/addpost">
            <AddIcon sx={{ fontSize: "2rem" }} />
          </Link>
          <Link className="navbar_link search" to="/search">
            <SearchIcon sx={{ fontSize: "2rem" }} />
          </Link>
          <Link className="navbar_link account" to="/account">
            <AccountCircleIcon sx={{ fontSize: "2rem" }} />
          </Link>
          <Link className="navbar_link account" to="/setting">
            <SettingsIcon sx={{ fontSize: "2rem" }} />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
