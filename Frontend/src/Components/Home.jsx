import React from "react";

const products = new Array(6).fill({
  title: "HP AMD Ryzen 3",
  price: "$529.99",
  image: "https://via.placeholder.com/150",
});

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-[#0a3d62] px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="text-white text-lg font-bold">Shop</div>
        <div className="flex w-full md:w-auto flex-grow items-center">
          <input
            type="text"
            placeholder="Search any things"
            className="flex-grow md:w-[400px] px-4 py-2 rounded-l-md outline-none"
          />
          <button className="bg-[#f39c12] px-4 py-2 rounded-r-md text-white font-semibold">
            Search
          </button>
        </div>
        <div className="flex items-center gap-4 text-white mt-2 md:mt-0">
          <span>❤️</span>
          <span>Sign in</span>
          <span>🛒 Cart</span>
        </div>
      </nav>

      {/* Main */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-1/5 px-4 py-6 border-r">
          <h2 className="font-bold mb-4">Categories</h2>
          <ul className="space-y-2 text-sm">
            <li className="font-semibold text-blue-600">All categories</li>
            <li>
              Laptop
              <ul className="pl-4 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-blue-500 inline-block"></span>
                  HP
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-gray-400 inline-block"></span>
                  Dell
                </li>
              </ul>
            </li>
            <li>Tablet</li>
            <li>Headphones</li>
          </ul>
        </aside>

        {/* Product Area */}
        <main className="flex-1 px-4 py-6">
          {/* Add Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button className="bg-[#f39c12] text-white px-4 py-2 rounded-md">Add category</button>
            <button className="bg-[#f39c12] text-white px-4 py-2 rounded-md">Add sub category</button>
            <button className="bg-[#f39c12] text-white px-4 py-2 rounded-md">Add product</button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition"
              >
                <img src={product.image} alt={product.title} className="h-32 object-contain mb-4" />
                <h3 className="font-semibold text-center text-sm mb-1">{product.title}</h3>
                <p className="text-[#333] mb-2">{product.price}</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-between items-center text-sm">
            <span>10 of 456 items</span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, "...", 10].map((num, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-full ${
                    num === 1 ? "bg-[#f39c12] text-white" : "bg-gray-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div>
              Show{" "}
              <select className="border rounded px-2 py-1">
                <option>10 rows</option>
                <option>20 rows</option>
                <option>50 rows</option>
              </select>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
