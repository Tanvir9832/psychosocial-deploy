const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const path = require("path");
const express = require("express");

const app = require("./app");
const connectionDatabase = require("./config/database");

mongoose.set("strictQuery", false);
connectionDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// app.get("/", (req, res) => {
//   res.send("HELLO");
// });

//! Serving The frontend

app.use(express.static(path.join(__dirname, "./frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/dist/index.html")),
    function (err) {
      res.status(500).send(err);
    };
});

app.listen(process.env.PORT || 8080, () => {
  console.log("app started");
});
