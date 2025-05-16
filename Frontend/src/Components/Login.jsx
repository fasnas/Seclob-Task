import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosINstance";

const Login = () => {
  const navigate = useNavigate();

  // State to store form input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        setError("Login failed: token not provided");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen font-sans">
      
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
       <h4 className="text-xl font-bold  mb-6 text-center">email:sample@gmail.com</h4>
       <h4 className="text-xl font-bold  mb-6 text-center">password:sample</h4>
        <h2 className="text-3xl font-bold text-[#f39c12] mb-6 text-center">
          Sign In to<br />Your Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-2/3">
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-md bg-gray-100 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-md bg-gray-100 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="text-red-500 text-center">{error}</div>
          )}

          <button
            type="submit"
            className="bg-[#f39c12] text-white py-2 rounded-full hover:bg-[#e67e22] transition"
            
          >
            SIGN IN
          </button>
        </form>
      </div>

      <div className="w-1/2 bg-[#0a3d62] text-white flex flex-col justify-center items-center p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Hello Friend!</h2>
        <p className="mb-6">
          Enter your personal details and<br />
          start your journey with us
        </p>
        <button
          className="border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#0a3d62] transition"
          onClick={() => navigate("/register")}
        >
          SIGN up
        </button>
      </div>
    </div>
  );
};


export default Login;
