import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function VideoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const videoId = location.state?.videoId;

  const [video, setVideo] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    if (!videoId) {
      navigate("/homepage");
    }
  }, [videoId, navigate]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoResponse = await axios.get(
          `http://localhost:8000/videos/${videoId}`
        );
        setVideo(videoResponse.data);

        const allVideosResponse = await axios.get(
          "http://localhost:8000/videos"
        );
        const allVideos = allVideosResponse.data;

        const suggestions = allVideos.filter((v) => v._id !== videoId);
        const randomSuggestions = suggestions
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setSuggestedVideos(randomSuggestions);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [videoId]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You need to log in to like videos.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/increaseLikes",
        { videoId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setVideo((prevVideo) => ({
          ...prevVideo,
          likes: response.data.likes,
        }));
        setHasLiked(true);
        setHasDisliked(false);
      }
    } catch (error) {
      console.error("Error liking the video:", error);
      if (error.response) {
        alert(error.response.data.message || "Failed to like the video.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleDislike = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You need to log in to like videos.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/decreaseLikes",
        { videoId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setVideo((prevVideo) => ({
          ...prevVideo,
          likes: response.data.likes,
        }));
        setHasLiked(true);
        setHasDisliked(false);
      }
    } catch (error) {
      console.error("Error liking the video:", error);
      if (error.response) {
        alert(error.response.data.message || "Failed to like the video.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  if (!video) {
    return <div>Loading...</div>;
  }
  const BackButton = () => {
    const navigate = useNavigate();
  };

  return (
    <div>
      <button
        className="btn btn-secondary mt-2  bg-black "
        style={{ borderColor: "gray" }}
        onClick={() => navigate("/homepage")}
      >
        <i class="bi bi-arrow-left me-2" style={{color:"red"}}></i>
      </button>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%",
            marginBottom: "20px",
          }}
        >
          <video
            src={`http://localhost:8000${video.videoUrl}`}
            controls
            autoPlay
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            }}
          ></video>
        </div>
        <div className="d-flex justify-content-between">
          <h3 className="fw-bold">{video.title}</h3>

          <div className="d-flex align-items-center mb-3">
            <button
              className={`btn ${
                hasLiked ? "btn-primary" : "btn-outline-primary"
              } me-3`}
              style={{ display: "flex", alignItems: "center" }}
              onClick={handleLike}
            >
              Like <span className="ms-2">{video.likes}</span>
            </button>
            <button
              className={`btn ${
                hasDisliked ? "btn-danger" : "btn-outline-danger"
              }`}
              style={{ display: "flex", alignItems: "center" }}
              onClick={handleDislike}
            >
              Dislike <span className="ms-2">{video.dislikes}</span>
            </button>
          </div>
        </div>

        <div>
          <p className="text-white">
            {!showFullDescription
              ? video.fullDescription
              : `${video.description.substring(0, 100)}...`}
          </p>
          <button
            className="btn btn-link p-0 text-primary"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Show Less" : "Read More"}
          </button>
        </div>

        
        <h4 className="mt-5">Suggested Videos</h4>
        <div className="row mt-3">
          {suggestedVideos.map((suggestedVideo) => (
            <div className="col-md-4 mb-3" key={suggestedVideo._id}>
              <div
                className="card bg-dark text-light"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/videopage", {
                    state: { videoId: suggestedVideo._id },
                  })
                } 
              >
                <video
                  src={`http://localhost:8000${suggestedVideo.videoUrl}`}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                  controls={false}
                ></video>
                <div className="card-body">
                  <h5 className="card-title text-truncate">
                    {suggestedVideo.title}
                  </h5>
                  <p className="card-text text-white text-truncate">
                    {suggestedVideo.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
