import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RightNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await axios.get("http://localhost:8000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setEmail(response.data.user.email);
        }
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data?.message || error.message
        );
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!title || !description || !videoFile) {
      alert("Please fill all fields and select a video.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("video", videoFile);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/videos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Video uploaded successfully!");
        setShowModal(false);
        setTitle("");
        setDescription("");
        setTags("");
        setVideoFile(null);
      }
    } catch (error) {
      console.error(
        "Upload failed:",
        error.response?.data?.message || error.message
      );
      alert("Upload failed!");
    }
  };

  return (
    <nav className="navbar d-flex align-items-center justify-content-end bg-black">
      <div className="d-flex align-items-center">
        <i
          className="bi bi-plus-circle fs-4 me-4"
          style={{ color: "white", height: "2.35rem", cursor: "pointer" }}
          onClick={() => setShowModal(true)}
        ></i>

        <i
          className="bi bi-info-circle fs-4 me-4"
          style={{ color: "white", height: "2.35rem", cursor: "pointer" }}
          onClick={() => navigate("/info")}
        ></i>

        <div className="position-relative">
          <i
            className="bi bi-person-circle fs-4 me-4"
            style={{ color: "white", height: "2.35rem", cursor: "pointer" }}
            onClick={toggleMenu}
          ></i>

          {menuOpen && (
            <div
              className="dropdown-menu show"
              style={{
                position: "absolute",
                top: "3rem",
                right: "1rem",
                backgroundColor: "#333",
                padding: "10px",
                borderRadius: "8px",
                width: "200px",
                zIndex: 1000,
              }}
              ref={dropdownRef}
            >
              <div className="mb-3" style={{ color: "white" }}>
                <p>Email: {email || "Not Available"}</p>
                {userId && <p>ID: {userId}</p>}
              </div>

              <div className="mb-3">
                <button className="btn btn-outline-light w-100">
                  Add Profile Picture
                </button>
              </div>

              <div>
                <button className="btn btn-danger w-100" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{
                backgroundColor: "#222",
                color: "white",
                border: "1px solid white",
              }}
            >
              <div
                className="modal-header"
                style={{
                  backgroundColor: "#111",
                  borderBottom: "1px solid white",
                }}
              >
                <h5 className="modal-title">Upload Video</h5>
                <button
                  className="btn-close"
                  style={{ filter: "invert(1)" }}
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  style={{
                    backgroundColor: "#BABABA",
                    color: "black",
                    border: "1px solid white",
                  }}
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="form-control mb-2"
                  style={{
                    backgroundColor: "#BABABA",
                    color: "black",
                    border: "1px solid white",
                  }}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  style={{
                    backgroundColor: "#BABABA",
                    color: "black",
                    border: "1px solid white",
                  }}
                  placeholder="Tags (comma-separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <input
                  type="file"
                  className="form-control mb-2"
                  accept="video/*"
                  style={{
                    backgroundColor: "#444",
                    color: "white",
                    border: "1px solid white",
                  }}
                  onChange={handleFileChange}
                />
              </div>
              <div
                className="modal-footer"
                style={{
                  backgroundColor: "#111",
                  borderTop: "1px solid white",
                }}
              >
                <button
                  className="btn btn-outline-light"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#007bff",
                    border: "1px solid white",
                  }}
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default RightNav;
