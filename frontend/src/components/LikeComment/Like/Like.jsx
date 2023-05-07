import { Box, Typography } from "@mui/material";
import React from "react";
import User from "../../User/User";

const Like = ({ likes }) => {

  return (
    <Box
      sx={{
        width: "350px",
        height: "550px",
        backgroundColor: "#001b2b",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 4,
        textDecoration: "none",
        alignItems: "center",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Typography variant="h4" sx={{ color: "white" }}>
        {" "}
        PEOPLE LIKED{" "}
      </Typography>
      {likes?.map((element) => {
        return (
          <User
            key={element?._id}
            userId={element?._id}
            name={element?.name}
            avatar={element?.avatar?.url}
          />
        );
      })}
    </Box>
  );
};

export default Like;
