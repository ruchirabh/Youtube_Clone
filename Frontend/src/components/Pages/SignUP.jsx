import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setPasswordMatch(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/users/signup",
        formData
      );
      setMessage(response.data.msg);
      setPasswordMatch(true);

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Signup failed.");
      setPasswordMatch(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-black">
      <div
        className="card bg-dark text-light text-center rounded"
        style={{ width: "400px", borderColor: "gray" }}
      >
        <div className="card-header" style={{ borderColor: "black" }}>
          <h2 className="text-center">Sign Up</h2>
        </div>
        <div className="card-body text-start">
          <h5
            className="card-title text-center fs-6"
            style={{ color: "#e0ddd1" }}
          >
            Please Sign Up to Continue
          </h5>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control bg-dark text-light border-secondary"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              style={{
                background: "#c30101",
                border: "none",
                color: "#e0ddd1",
              }}
            >
              Sign Up
            </button>
          </form>
          {message && (
            <p
              className={`mt-3 alert ${
                passwordMatch ? "alert-info" : "alert-danger"
              } text-center`}
            >
              {message}
            </p>
          )}
        </div>
        <Link to="/login" className="card-footer" style={{ color: "gray" }}>
          Login?
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
