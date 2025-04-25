import React from "react";
import VerticalNavbar from "../Navbars/VerticalNavbar";
import HorizontalNavbar from "../Navbars/HorizontalNavbar";
import RightNav from "../Navbars/RightNav";
import Home from "../Pages/Home";

function PageRender({ onLogout }) {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-lg-2 col-md-3 col-sm-4">
          <VerticalNavbar />
        </div>
        <div className="col col-lg-8 col-md-7 col-sm-8">
          <HorizontalNavbar />
        </div>
        <div className="col-auto col-lg-2 col-md-2 col-sm-12">
          <RightNav onLogout={onLogout} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Home />
        </div>
      </div>
    </div>
  );
}

export default PageRender;
