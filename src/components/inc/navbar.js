import React from "react";
import logo from "../images/logo.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="d-flex">
      {/* Vertical Sidebar */}
      <nav
        className="navbar navbar-dark fixed-top bg-black flex-column vh-100"
        style={{ width: "80px" }}
      >
        {/* Add sidebar icons here */}
        <div className="d-flex flex-column align-items-center  vh-100">
          <div className="row ">
          <a class="icon-link link-light" href="#">
            <i class="bi bi-list  mt-2 mb-2" style={{ fontSize: "2rem" }}></i>
          </a>

          <a
            class="icon-link link-light link-offset-2 link-underline link-underline-opacity-0"
            href="#"
          >
            <i className="bi bi-house-fill text-light mb-1 mt-3  "></i>

            <p className="text-light mt-0" style={{ fontSize: "12px" }}>
              Home
            </p>
          </a>

          <a class="icon-link link-light" href="#">
            <i class="bi bi-strava mb-1"></i>

            <p className="text-light mt-0" style={{ fontSize: "12px" }}>
              Shorts
            </p>
          </a>
          <a class="icon-link link-light" href="#">
            <i class="bi bi-bell-fill"></i>{" "}
            <p className=" text-light mt-0" style={{ fontSize: "12px" }}>
              {" "}
              Subscription
            </p>
          </a>
          <a class="icon-link link-light" href="#">
            <i className="bi bi-gear-fill text-light mb-1"></i>
            <p className="text-light mt-0" style={{ fontSize: "12px" }}>
              Settings
            </p>
          </a>
        </div>
        </div>
        
      </nav>

      {/* Main Navbar */}
      <div className="flex-grow-1">
        <nav
          className="navbar navbar-expand-lg  fixed-top  bg-black  px-3  "
          style={{ height: "80px", marginLeft: "80px" }}
        >
          <div className="container-fluid ">
            {/* Logo and Brand Name */}
            <a
              className="navbar-brand d-flex align-items-center ms-0 "
              href="#"
            >
              <img src={logo} style={{ width: "27px" }}></img>
              <span
                className="text-light ms-2  py-1"
                style={{ fontSize: "1.2rem", fontFamily: "Oswald" }}
              >
                YouTube
              </span>
            </a>

            {/* Search Bar */}
            <div
              className="d-flex flex-grow-0  d-flex align-items-center ms-0  mx-4 form-control bg-black  rounded-pill me-2  "
              style={{
                height: "40px",
                width: "600px",
                height: "",
                border: "0",
              }}
            >
              <form className="d-flex flex-grow-0  d-flex align-items-center ms-0  mx-4 form-control bg-black  rounded-pill hstack gap-3 ">
                <input
                  className="bg-black border-0 shadow-0 w-100 text-white me-0    "
                  // className="form-control bg-black text-hite b rounded-pill me-2 "
                  type="search"
                  placeholder="Search here "
                  aria-label="Search"
                  style={{
                    border: "1px solid #555",
                    width: "600px",
                    outline: "none",
                    boxShadow: "none",
                    outlineStyle: "20",
                  }}
                />
                <div class="vr text-white" style={{ height: "25px" }}></div>

                <i
                  class=" bi bi-search me-1  text-white"
                  style={{ fontSize: "1rem" }}
                ></i>
              </form>

              <div className="d-flex   bg-black text-white  rounded-pill   "></div>

              <i
                class="bi bi-mic text-white"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </div>

            {/* Right-aligned Icons */}
            <div className="d-flex  align-items-center ">
              <i
                class="bi bi-plus-circle-dotted me-3 "
                style={{ fontSize: "1.5rem" }}
              ></i>
              <i
                className="bi bi-bell text-light me-3"
                style={{ fontSize: "1.5rem" }}
              ></i>
              <i
                className="bi bi-person-circle text-light"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </div>
          </div>
        </nav>
      </div>
      </div>
  );
}

export default Navbar;
