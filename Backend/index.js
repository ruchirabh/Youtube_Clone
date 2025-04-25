const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const VideoRouter = require("../Backend/components/Routes/VideoRoute");
const UserRouter = require("../Backend/components/Routes/UserRoutes");
const LikeRoute = require("./components/Routes/likesapi");
const searchRoute = require("../Backend/components/Routes/Search");
const allVideos = require("../Backend/components/Routes/AllVideos");
const Me=require("./components/Routes/Me");

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/upload", express.static(path.join(__dirname, "uploads")));
const port = process.env.PORT || 8000;
const url = process.env.URL;
app.use(express.json());

app.use("/videos", VideoRouter);
app.use("/users", UserRouter);
app.use("/", LikeRoute);
app.use("/", searchRoute);
app.use("/", allVideos);
app.use("/",Me);
app.get("/", (req, res) => {
  res.json({ msg: "hi" });
});
mongoose
  .connect(url, {})
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port} `);
    });
  })
  .catch((error) => {
    console.log(error);
  });
