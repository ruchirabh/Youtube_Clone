import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ShortsPage() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState({});
  const videoRefs = useRef([]);
  const observer = useRef();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/videos");
        if (response.data && Array.isArray(response.data.videos)) {
          setVideos(response.data.videos);
        } else {
          console.error("Unexpected API response:", response.data);
          setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      }
    };

    fetchVideos();
  }, []);

  const handleLike = (videoId) => {
    setLikedVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const handleScroll = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < videos.length) {
      setCurrentIndex(nextIndex);
      videoRefs.current[nextIndex]?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex, videos]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setCurrentIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.current.observe(video);
    });

    return () => observer.current?.disconnect();
  }, [videos]);

  return (
    <div
      className="d-flex flex-column align-items-center bg-black vh-100 position-relative"
      style={{ width: "100%", maxWidth: "100%", margin: "0 auto" }}
    >
      <button className="btn btn-secondary m-2" onClick={() => navigate("/homepage")}>
        <i className="bi bi-arrow-left me-2 text-danger"></i> Back
      </button>

      <div className="shorts-container" style={{ overflowY: "scroll", height: "90vh", width: "100%" }}>
        {videos.map((video, index) => (
          <div
            key={video._id}
            ref={(el) => (videoRefs.current[index] = el)}
            className="video-wrapper d-flex flex-column align-items-center justify-content-center"
            style={{ height: "100vh", width: "100%", position: "relative" }}
          >
            <video
              src={`http://localhost:8000${video.videoUrl}`}
              controls
              autoPlay={index === currentIndex}
              className="w-75"
              style={{ maxHeight: "80vh", borderRadius: "10px" }}
            ></video>

            <div className="d-flex flex-column align-items-center mt-2">
              <h5 className="text-white text-center" style={{ fontSize: "20px", fontWeight: "bold" }}>{video.title}</h5>
              <div className="d-flex gap-3 mt-2">
                <button
                  className={`btn ${likedVideos[video._id] ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => handleLike(video._id)}
                >
                  👍 {video.likes + (likedVideos[video._id] ? 1 : 0)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
}

export default ShortsPage;
