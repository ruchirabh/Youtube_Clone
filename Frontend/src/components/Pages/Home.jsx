import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

function Home() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // Check if more videos exist
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { ref, inView } = useInView(); // Detect when user reaches bottom

  // Fetch videos when page changes
  useEffect(() => {
    const fetchVideos = async () => {
      if (loading) return; // Prevent concurrent requests

      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/videos?page=${page}&pageSize=10`);
        const data = await response.json();

        if (data.videos.length === 0) { // Check for empty data
          setHasMore(false);
        } else {
            if (page === 1) {
                setVideos(data.videos); // Replace videos if it's the first page
              } else {
                setVideos((prevVideos) => [...prevVideos, ...data.videos]); // Append new videos
              }
          setHasMore(true); // Assume there might be more until proven otherwise
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setHasMore(false); // Set hasMore to false on error
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [page]);
  // Detect when user reaches the bottom and load more videos
  useEffect(() => {
    if (inView && hasMore && !loading) { // Also check loading state
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]); // Add loading to dependency array


  const handleVideoClick = (videoId) => {
    navigate(`/videopage`, { state: { videoId } });
  };

  return (
    <div className="container-fluid mt-4 px-2">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <VideoCard key={video._id} video={video} onClick={handleVideoClick} />
          ))
        ) : (
          <div className="col">
            <p className="text-center">No videos available.</p>
          </div>
        )}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={ref} className="text-center mt-3">
        {loading && <p>Loading more videos...</p>}
      </div>
    </div>
  );
}

const VideoCard = ({ video, onClick }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Load video whenever it appears
    threshold: 0.5, // Load when at least 50% is visible
  });

  return (
    <div className="col">
      <div
        className="card rounded-3 h-100"
        style={{ borderColor: "gray", cursor: "pointer" }}
        onClick={() => onClick(video._id)}
      >
        <div
          ref={ref}
          style={{
            aspectRatio: "16/9",
            overflow: "hidden",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            const videoElement = e.currentTarget.querySelector("video");
            if (videoElement) videoElement.play();
          }}
          onMouseLeave={(e) => {
            const videoElement = e.currentTarget.querySelector("video");
            if (videoElement) {
              videoElement.pause();
              videoElement.currentTime = 0;
            }
          }}
        >
          {inView ? (
            <video
              className="card-img-top"
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source
                src={`http://localhost:8000${video.videoUrl}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div
              className="placeholder"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "gray",
              }}
            ></div>
          )}
        </div>

        <div className="card-body d-flex flex-column justify-content-between bg-black text-white">
          <h6
            className="card-title fw-bold mb-1 text-truncate"
            style={{ maxWidth: "100%" }}
          >
            {video.title}
          </h6>
          <div className="d-flex justify-content-between align-items-center fs-6">
            <p className="card-text text-light small mb-0 text-truncate">
              Uploaded by: {video.uploadedBy?.name || "Unknown"}
            </p>
            <span className="badge bg-primary">Likes: {video.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
