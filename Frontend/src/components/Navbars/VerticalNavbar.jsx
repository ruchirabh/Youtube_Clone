import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VerticalNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close sidebar after navigation
  };

  return (
    <div className="d-flex">
      {/* Top Navbar */}
      <nav
        className="navbar d-flex align-items-center justify-content-start bg-black w-100"
        style={{ borderColor: "red" }}
      >
        <div className="d-flex align-items-center">
          <i
            className="bi bi-list ms-2 fs-4"
            style={{ color: "white", cursor: "pointer" }}
            onClick={toggleSidebar}
          ></i>

          <button
            className="btn d-flex align-items-center btn-sm"
            style={{ height: "2.35rem" }}
          >
            <i className="bi bi-youtube fs-3" style={{ color: "red" }}></i>
            <span className="ms-2 text-white fs-5 d-none d-md-inline">
              YouTube
            </span>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`bg-black text-white vh-100 position-fixed top-0 start-0 ${
          isOpen ? "d-flex" : "d-none"
        } flex-column`}
        style={{ width: "250px", zIndex: 1050 }}
      >
        {/* Sidebar Header */}
        <div className="d-flex bg-black align-items-center justify-content-start ps-4">
          <i className="bi bi-youtube fs-3" style={{ color: "red" }}></i>
          <span className="ms-2 text-white fs-5">YouTube</span>
          <button
            className="btn text-white align-self-end m-2 ps-4 ms-5"
            onClick={toggleSidebar}
            style={{ fontSize: "1.2rem" }}
          >
            &times;
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="list-unstyled p-3">
          <li
            className="d-flex align-items-center mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleNavigation("/")}
          >
            <i className="bi bi-house-door fs-4 me-2"></i>
            <span>Home</span>
          </li>
          <li
            className="d-flex align-items-center mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleNavigation("/shorts")}
          >
            <i className="bi bi-lightning fs-4 me-2"></i>
            <span>Shorts</span>
          </li>
          <li
            className="d-flex align-items-center mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleNavigation("/subscriptions")}
          >
            <i className="bi bi-collection-play fs-4 me-2"></i>
            <span>Subscriptions</span>
          </li>
          <li
            className="d-flex align-items-center mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleNavigation("/settings")}
          >
            <i className="bi bi-gear fs-4 me-2"></i>
            <span>Settings</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default VerticalNavbar;
