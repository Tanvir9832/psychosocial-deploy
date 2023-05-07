import React from "react";
import { Box, Typography } from "@mui/material";

const NoRoute = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 20,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography sx={{ color: "red" }} variant="h5">
        ERROR 404
      </Typography>
      <Typography sx={{ color: "red" }} variant="h2">
        ROUTE NOT FOUND
      </Typography>
    </Box>
  );
};

export default NoRoute;
