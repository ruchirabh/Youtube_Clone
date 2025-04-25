const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: 6,
  },
  profilePic: {
    type: String,
    default: "",
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },

  videosUploaded: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});
module.exports = mongoose.model("User", UserSchema);
