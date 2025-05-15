import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate=useNavigate()
  return (
    <div className="flex h-screen font-sans">
      {/* Left Side - Sign In Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <h2 className="text-3xl font-bold text-[#f39c12] mb-6 text-center">
          Sign In to<br />Your Account
        </h2>

        <form className="flex flex-col space-y-4 w-2/3">
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

          <div className="text-sm text-right">
            <a href="#" className="text-black font-semibold hover:underline">
              forgot password?
            </a>
          </div>

          <button className="bg-[#f39c12] text-white py-2 rounded-full hover:bg-[#e67e22] transition"
            onClick={()=>navigate("/home")}
          >
            SIGN IN
          </button>
        </form>
      </div>

      {/* Right Side - Call to Sign Up */}
      <div className="w-1/2 bg-[#0a3d62] text-white flex flex-col justify-center items-center p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Hello Friend!</h2>
        <p className="mb-6">
          Enter your personal details and<br />
          start your journey with us
        </p>
        <button className="border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#0a3d62] transition"
          onClick={()=>navigate("/")}
        >
          SIGN up
        </button>
      </div>
    </div>
  );
};

export default Login;
