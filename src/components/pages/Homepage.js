import React from "react";
import Navbar from "../inc/navbar.js";
import Card from "../inc/Card.jsx";
import Video from "../inc/Videos.js";

function Homepage() {
  return (
    <>
      <div className="d-flex-fluid ">
        <div class="row">
          <div className="col ">
            <Navbar />
            <Video/>
            
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
