import React, { useState, useContext } from "react";
import axiosInstance from "../../axiosINstance.js";
import { UserContext } from "./context/context.jsx";

const Home = () => {
  const { category, fetchCategories } = useContext(UserContext);

  const [showCatModal, setShowCatModal] = useState(false);
  const [showSubcatModal, setShowSubcatModal] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  // Handle Add Category
  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      await axiosInstance.post("/catagory", { name: categoryName });
      await fetchCategories();
      setCategoryName("");
      setShowCatModal(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Handle Add Subcategory
  const handleAddSubcategory = async () => {
    if (!selectedCategory || !subCategoryName.trim()) return;

    try {
      await axiosInstance.post("/subcatagory", {
        categoryName: selectedCategory,
        name: subCategoryName,
      });
      await fetchCategories();
      setSelectedCategory("");
      setSubCategoryName("");
      setShowSubcatModal(false);
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  return (
    <main className="w-4/5 p-6 relative">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          className="bg-yellow-400 px-4 py-2 rounded"
          onClick={() => setShowCatModal(true)}
        >
          Add category
        </button>
        <button
          className="bg-yellow-400 px-4 py-2 rounded"
          onClick={() => setShowSubcatModal(true)}
        >
          Add sub category
        </button>
        <button className="bg-yellow-400 px-4 py-2 rounded">Add product</button>
      </div>

      {/* Add Category Modal */}
      {showCatModal && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-10">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category name"
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCatModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="bg-yellow-400 px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subcategory Modal */}
      {showSubcatModal && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-10">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-xl font-semibold mb-4">Add Subcategory</h3>

            {/* Select Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="">Select Category</option>
              {category?.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Subcategory Input */}
            <input
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              placeholder="Subcategory name"
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSubcatModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubcategory}
                className="bg-yellow-400 px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
