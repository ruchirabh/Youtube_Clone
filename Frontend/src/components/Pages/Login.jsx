import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        formData
      );
      setMessage(response.data.msg);
      if (response.data.success) {
        console.log("hi");
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(await response.data.user));

      navigate("/homepage");
    } catch (error) {
      setMessage(
        error.response?.data?.msg || "Login failed. Please try again."
      );
    }
  };

  const handlePasswordReset = () => {
    navigate("/reset");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-black">
      <div
        className="card bg-dark text-light text-center rounded"
        style={{ width: "400px", borderColor: "gray" }}
      >
        <div className="card-header">
          <h2 className="text-center">Login</h2>
        </div>
        <div className="card-body text-start">
          <h5
            className="card-title text-center fs-6"
            style={{ color: "#e0ddd1" }}
          >
            Please login to continue
          </h5>
          <form onSubmit={handleSubmit} className="mt-4">
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

            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              style={{
                background: "#c30101",
                border: "none",
                color: "#e0ddd1",
              }}
            >
              Login
            </button>
          </form>

          <button
            onClick={handlePasswordReset}
            className="btn btn-secondary w-100 mt-3"
          >
            Reset Password
          </button>

          {isSubmitted && message && (
            <p className="mt-3 alert alert-info text-center">{message}</p>
          )}
        </div>
        <div className="card-footer" style={{ color: "gray" }}></div>
      </div>
    </div>
  );
}

export default Login;
