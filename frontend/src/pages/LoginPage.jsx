import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Layout from "../components/Layout";
import API from "../services/api";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const [userType, setUserType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Real-time Validation
  const validateField = (name, value) => {
    let message = "";

    if (name === "email") {
      if (!value.trim()) {
        message = "Email is required.";
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
        message = "Please enter a valid email address.";
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        message = "Password is required.";
      } else if (value.length < 6) {
        message = "Password must be at least 6 characters.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
    return message === "";
  };

  const handleChange = (name, value) => {
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateField("email", email);
    const isPasswordValid = validateField("password", password);
    if (!isEmailValid || !isPasswordValid) return;

    setLoading(true);
    let url = "/auth/user/login";
    if (userType === "ngo") url = "/auth/login";
    else if (userType === "pet-hospital") url = "/auth/pet-hospital/login";

    try {
      const response = await API.post(url, { email, password });
      login(response.data);
      navigate("/");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        api: err.response?.data?.message || "Login failed. Try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <Layout>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all hover:scale-[1.02] duration-300">
          {/* Title */}
          <h1 className="text-3xl font-extrabold text-center text-indigo-700">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Login to continue helping animals 🐾
          </p>

          {/* API Error */}
          {errors.api && (
            <div className="mb-4 bg-red-100 text-red-600 px-4 py-2 rounded-md text-sm">
              {errors.api}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User Type */}
            <div>
              <label
                htmlFor="userType"
                className="block mb-1 font-medium text-gray-700"
              >
                Login as
              </label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="user">User</option>
                <option value="ngo">NGO</option>
                <option value="pet-hospital">Pet Hospital</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaEnvelope className="text-gray-500" />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-2 pl-10 focus:ring-2 focus:ring-indigo-500 outline-none`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="text-gray-500" />
                </span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={`w-full border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-2 pl-10 focus:ring-2 focus:ring-indigo-500 outline-none`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Don’t have an account?{" "}
            <a href="/register"
              className="text-indigo-600 hover:underline font-medium"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
