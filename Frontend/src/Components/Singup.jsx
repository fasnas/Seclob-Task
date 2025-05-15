import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosINstance";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/register", formData); 
      console.log(response)
      if (response.status === 201 || response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen font-sans">
      <div className="w-1/2 bg-[#0a3d62] text-white flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-center mb-6">
          To keep connected with us please<br />
          login with your personal info
        </p>
        <button
          className="border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#0a3d62] transition"
          onClick={() => navigate("/login")}
        >
          SIGN IN
        </button>
      </div>

      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold text-[#f39c12] mb-6">Create Account</h2>

        <form className="flex flex-col space-y-4 w-2/3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-md bg-gray-100 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-md bg-gray-100 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-3 rounded-md bg-gray-100 focus:outline-none"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#f39c12] text-white py-2 rounded-full hover:bg-[#e67e22] transition"
          >
            {loading ? "Signing up..." : "SIGN UP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
