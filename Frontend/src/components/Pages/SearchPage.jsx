import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8000/search?query=${encodeURIComponent(query)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="container pt-4">
      <h2>Search Results for "{query}"</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {searchResults.length > 0 ? (
          searchResults.map((video) => (
            <div className="col" key={video._id}>
              <div
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/videopage", { state: { videoId: video._id } })
                }
              >
                <video
                  className="card-img-top"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  controls={false}
                >
                  <source
                    src={`http://localhost:8000${video.videoUrl}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="card-body bg-black text-white">
                  <h6 className="card-title">{video.title}</h6>
                  <p className="card-text">
                    Uploaded by: {video.uploadedBy?.name || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No videos found for "{query}".</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
