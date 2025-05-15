import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-900 text-white">
      {/* Search */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search any things"
          className="px-3 py-2 rounded-l-md"
        />
        <button className="bg-orange-400 px-4 py-2 rounded-r-md">Search</button>
      </div>

      {/* Right side */}
      <div className="flex gap-4 items-center">
        <span>❤️</span>

        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Sign in</button>
        )}

        <a href="#">🛒 Cart</a>
      </div>
    </nav>
  );
};

export default Navbar;
