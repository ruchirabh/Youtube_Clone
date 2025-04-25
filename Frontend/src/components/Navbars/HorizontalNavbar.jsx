import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HorizontalNavbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="navbar d-flex align-items-center bg-black">
      <div className="container-fluid pe-5">
        <form
          className="form-inline d-flex align-items-center justify-content-center w-100 pe-5"
          style={{ height: "2.35rem" }}
          onSubmit={handleSearch}
        >
          <div className="input-group w-50 w-md-50">
            <input
              className="form-control form-control-sm bg-black text-light rounded-start-pill"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ borderColor: "#3f3f3f" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn rounded-end-pill border-start-0"
              type="submit"
              style={{
                background: "#3f3f3f",
              }}
            >
              <i className="bi bi-search text-light"></i>
            </button>
          </div>

          <i
            className="bi bi-mic-fill ms-2 fs-5"
            style={{ color: "white" }}
          ></i>
        </form>
      </div>
    </nav>
  );
}

export default HorizontalNavbar;
