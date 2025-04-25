const express = require("express");
const User = require("../models/UserSchema");
const upload = require("../middleware/VideoUpload");
const Video = require("../models/VideoSchema");
const cors = require("cors");
const router = express.Router();
const authenticateToken = require("../middleware/Authentication");
router.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

router.post("/increaseLikes", authenticateToken, async (req, res) => {
  const { videoId } = req.body;
  const userId = req.user.id;

  console.log("Video ID:", videoId);
  console.log("User ID from token:", userId);

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.likedVideos.includes(videoId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this video." });
    }

    video.likes += 1;
    await video.save();

    user.likedVideos.push(videoId);
    await user.save();

    res
      .status(200)
      .json({ message: "Likes increased successfully.", likes: video.likes });
  } catch (error) {
    console.error("Error increasing likes:", error);
    res.status(500).json({ message: "Server error." });
  }
});

router.post("/decreaseLikes", authenticateToken, async (req, res) => {
  const { videoId } = req.body;
  const userId = req.user.id;

  console.log("Video ID:", videoId);
  console.log("User ID from token:", userId);

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.likedVideos.includes(videoId)) {
      return res
        .status(400)
        .json({ message: "You haven't liked this video yet." });
    }

    video.likes = Math.max(0, video.likes - 1);
    await video.save();

    user.likedVideos = user.likedVideos.filter(
      (id) => id.toString() !== videoId
    );
    await user.save();

    res
      .status(200)
      .json({ message: "Like removed successfully.", likes: video.likes });
  } catch (error) {
    console.error("Error decreasing likes:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
