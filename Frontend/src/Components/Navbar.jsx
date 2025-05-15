// components/Navbar.jsx
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-900 text-white">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search any things"
          className="px-3 py-2 rounded-l-md"
        />
        <button className="bg-orange-400 px-4 py-2 rounded-r-md">Search</button>
      </div>
      <div className="flex gap-4 items-center">
        <span>❤️</span>
        <a href="#">Sign in</a>
        <a href="#">🛒 Cart</a>
      </div>
    </nav>
  );
};

export default Navbar;
