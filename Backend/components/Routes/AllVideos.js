const express = require("express");
const router = express.Router();
const Video = require("../models/VideoSchema");

// Pagination parameters
const DEFAULT_PAGE_SIZE = 10; // Number of videos per page

router.get("/videos", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
    const pageSize = parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE; // Videos per page
    const skip = (page - 1) * pageSize; // Number of videos to skip

    const totalVideos = await Video.countDocuments(); // Total number of videos
    const totalPages = Math.ceil(totalVideos / pageSize); // Calculate total pages

    const videos = await Video.find()
      .populate("uploadedBy")
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      videos,
      currentPage: page,
      totalPages,
      totalVideos, // Include total count for client-side pagination
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ msg: "Error fetching videos", error });
  }
});

router.get("/videos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id).populate("uploadedBy");

    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    console.error("Error fetching video by ID:", error);
    res.status(500).json({ msg: "Error fetching video", error });
  }
});

module.exports = router;