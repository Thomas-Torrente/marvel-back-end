const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const axios = require("axios");
const uid2 = require("uid2");
const md5 = require("md5");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

app.get("/characters", async (req, res) => {
  try {
    const ts = uid2(10);
    const hash = md5(ts + privateKey + publicKey);

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const ts = uid2(10);
    const hash = md5(ts + privateKey + publicKey);

    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/comics?ts=${ts}&hash=${hash}&apikey=${publicKey}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/character", async (req, res) => {
  try {
    const ts = uid2(10);
    const hash = md5(ts + publicKey + privateKey);

    const response = await axios.get(
      `
https://gateway.marvel.com/v1/public/characters/${req.params.id}?ts=${ts}&hash=${hash}&apikey=${publicKey}
`
    );

    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("serveur has been start");
});
