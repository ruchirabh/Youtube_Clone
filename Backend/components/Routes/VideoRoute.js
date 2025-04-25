const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const upload = require("../middleware/VideoUpload");
const Video = require("../models/VideoSchema");
const authenticateToken = require("../middleware/Authentication");

router.post(
  "/upload",
  authenticateToken,
  upload.single("video"),
  async (req, res) => {
    try {
      const { title, description, tags } = req.body;
      const userId = req.user.id;
      console.log("user", userId);

      const videoUrl = req.file ? req.file.path : null;
      if (!userId) {
        return res
          .status(400)
          .json({ message: "User ID is required to upload videos." });
      }

      const videourl = `/upload/videos/${req.file.filename}`;

      const video = new Video({
        title,
        description,
        videoUrl: videourl,
        tags: tags ? tags.split(",") : [],
        likes: 0,
        uploadedBy: userId,
      });

      await video.save();
      res.status(201).json({ message: "video uploaded succesfully", video });
    } catch (error) {
      res.status(500).json({ msg: "Error occured while Uploading", error });
      console.log(error);
    }
  }
);

module.exports = router;
