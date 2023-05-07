import { Stack } from "@mui/material";
import React, { useState } from "react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import "./search.css";
import { useDispatch, useSelector } from "react-redux";
import { searchingUserAction } from "../../Actions/userAction";
import User from "../User/User";

const SearchUser = () => {
  const [searchedName, setSearchedName] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.allusers?.user?.data);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchingUserAction(searchedName));
  };

  return (
    <Stack
      sx={{
        width: "80%",
        height: { xs: "75vh", sm: "77vh" },
        borderRadius: 5,
        boxShadow: 5,
        background: "#001b2b",
        m: "0px auto",
        mt: 2,
        alignItems: "center",
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <form onSubmit={handleSubmit} className="search_form">
        <input
          placeholder="Search..."
          value={searchedName}
          onChange={(e) => setSearchedName(e.target.value)}
          className="search_form_inputField"
          type="search"
          required
        />
        <button type="submit" className="search_form_btn">
          <PersonSearchIcon className="search_form_button_icon" />
        </button>
      </form>

      <br />
      <br />
      <br />
      <br />
      <Stack>
        {user &&
          user.map((elem) => {
            return (
              <User
                userId={elem?._id}
                name={elem?.name}
                avatar={elem?.avatar}
              />
            );
          })}
      </Stack>
    </Stack>
  );
};

export default SearchUser;
