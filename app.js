const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/config.env" });
}

//!Using Middlewares

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//!importing Routes
const post = require("./routes/post");
const user = require("./routes/user");

//!Using Routes
app.use("/api/v1", post);
app.use("/api/v2", user);

module.exports = app;
