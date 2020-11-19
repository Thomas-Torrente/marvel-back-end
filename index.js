const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const uid2 = require("uid2");
const md5 = require("md5");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", (req, res) => {
  res.json({ message: "Bonjour" });
});

app.listen(3000, () => {
  console.log("serveur has been start");
});
