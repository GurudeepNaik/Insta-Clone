const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const PostData = require("./model/model");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
mongoose.connect(
  "mongodb+srv://Gurudeep:gurudeep@cluster0.2meup3v.mongodb.net/Instagram?retryWrites=true&w=majority",
  (err) => {
    if (err) console.log(err);
    else console.log("Database Connected");
  }
);
const app = express();

app.use(cors());
app.use(body_parser.json());
app.use(express.json());
app.use(fileUpload());

app.get("/getPosts", async (req, res) => {
  try {
    const data = await PostData.find();
    res.status(200).json({
      status: "Sucess",
      message: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

app.post("/Post", async (req, res) => {
  try {
    const file = req.files.image;
    file.mv("./Images/" + file.name, (err) => {
      if (err) {
        res.send(JSON.stringify(err));
      } else {
        console.log("Image Uploaded Sucessfully");
      }
    });
    const data = await PostData.create({
      author: req.body.author,
      location: req.body.location,
      discription: req.body.discription,
      likes: req.body.likes,
      image: req.files.image.name,
    });
    res.status(200).json({
      status: "Sucess",
      message: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

app.get("/Images/:name", async (req, res) => {
  try {
    res.sendFile(__dirname + `/Images/${req.params.name}`);
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

app.get("*", (req, res) => {
  console.log(req.body);
  res.status(404).json({
    status: "Failed",
    message: "Path Not Found",
  });
});

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
