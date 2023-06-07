require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//express app
const app = express();

//middlewares
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to tormack server" });
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Server running on:${port}`);
});
