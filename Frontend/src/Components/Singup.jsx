import React from "react";
import { useNavigate } from "react-router-dom";

const Singup = () => {
    const navigate=useNavigate()
  return (
    <div className="flex h-screen font-sans">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#0a3d62] text-white flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-center mb-6">
          To keep connected with us please<br />
          login with your personal info
        </p>
        <button className="border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#0a3d62] transition"
          onClick={()=>navigate("/login")}
        >
          SIGN IN
        </button>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold text-[#f39c12] mb-6">Create Account</h2>
        <form className="flex flex-col space-y-4 w-2/3">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-md bg-gray-100 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-md bg-gray-100 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-md bg-gray-100 focus:outline-none"
          />
          <button className="bg-[#f39c12] text-white py-2 rounded-full hover:bg-[#e67e22] transition"
           onClick={()=>navigate("/login")}
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Singup;
