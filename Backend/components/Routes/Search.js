const express = require("express");
const Video = require("../models/VideoSchema");
const router = express.Router();
const authenticateToken = require("../middleware/Authentication");

router.get("/search", authenticateToken, async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ msg: "required" });
    }
    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ msg: "Error while searching the video", error });
  }
});

module.exports = router;
