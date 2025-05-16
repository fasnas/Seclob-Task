import React, { useState, useContext } from "react";
import axiosInstance from "../../axiosINstance.js";
import { UserContext } from "./context/context.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate()
  const { category, product, fetchCategories,fetchProducts} = useContext(UserContext);
  console.log(product)
  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubcatModal, setShowSubcatModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  // Form states for category and subcategory
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  // Form states for product
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [variants, setVariants] = useState([{ ram: "", price: "", quantity: 1 }]);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  // Add Category Handler
  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      await axiosInstance.post("/catagory", { name: categoryName.trim() });
      setCategoryName("");
      setShowCategoryModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error.response?.data || error.message);
    }
  };

  // Add Subcategory Handler
  const handleAddSubcategory = async () => {
    if (!selectedCategory || !subCategoryName.trim()) return;

    try {
      await axiosInstance.patch("/subcatagory", {
        categoryName: selectedCategory,
        name: subCategoryName.trim(),
      });
      setSelectedCategory("");
      setSubCategoryName("");
      setShowSubcatModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error adding subcategory:", error.response?.data || error.message);
    }
  };

  // Handle variant changes
  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  // Add a new variant
  const addVariant = () => {
    setVariants([...variants, { ram: "", price: "", quantity: 1 }]);
  };

  // Handle adding an image URL
  const handleAddImageUrl = () => {
    if (currentImageUrl.trim()) {
      setImageUrls([...imageUrls, currentImageUrl.trim()]);
      setCurrentImageUrl("");
    }
  };

  // Remove an image URL
  const handleRemoveImageUrl = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  // Add Product Handler
  const handleAddProduct = async () => {
    if (!productTitle || !selectedCategory || !selectedSubCategory) {
      alert("Please fill in all required fields.");
      return;
    }

    // Resolve the category name from the selectedCategory ID
    const selectedCategoryObj = category?.find((cat) => cat._id === selectedCategory);
    const categoryNameValue = selectedCategoryObj ? selectedCategoryObj.name : "";

    if (!categoryNameValue) {
      alert("Selected category not found.");
      return;
    }

    // Structure the request body with categoryName as the category name
    const productData = {
      title: productTitle,
      description: productDescription,
      categoryName: categoryNameValue, 
      subCategory: selectedSubCategory,
      variants: variants.map((variant) => ({
        ram: variant.ram,
        price: parseFloat(variant.price) || 0,
        quantity: parseInt(variant.quantity) || 1,
      })),
      images: imageUrls,
    };

    try {
      await axiosInstance.post("/addproduct", productData);
      setProductTitle("");
      setProductDescription("");
      setSelectedCategory("");
      setSelectedSubCategory("");
      setVariants([{ ram: "", price: "", quantity: 1 }]);
      setImageUrls([]);
      setCurrentImageUrl("");
      setShowProductModal(false);
      fetchCategories();
      fetchProducts()
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
    }
  };

  return (
    <main className="w-4/5 p-6 relative">
      <div className="flex justify-end gap-2 mb-4">
        <button
          className="bg-yellow-400 px-4 py-2 rounded"
          onClick={() => setShowCategoryModal(true)}
        >
          Add category
        </button>
        <button
          className="bg-yellow-400 px-4 py-2 rounded"
          onClick={() => setShowSubcatModal(true)}
        >
          Add sub category
        </button>
        <button
          className="bg-yellow-400 px-4 py-2 rounded"
          onClick={() => setShowProductModal(true)}
        >
          Add product
        </button>
      </div>

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-xs z-10">
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
                onClick={() => setShowCategoryModal(false)}
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
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-xs z-10">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Subcategory</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="">Select Category</option>
              {category?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
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

      {/* Add Product Modal */}
      {showProductModal && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-xs z-10">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-xl font-semibold mb-4">Add Product</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title:</label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                placeholder="Product title"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Variants */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Variants:</label>
              {variants.map((variant, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="RAM"
                    value={variant.ram}
                    onChange={(e) => handleVariantChange(index, "ram", e.target.value)}
                    className="w-1/4 border p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                    className="w-1/4 border p-2 rounded"
                  />
                  <div className="flex items-center gap-1 w-1/4">
                    <button
                      onClick={() =>
                        handleVariantChange(index, "quantity", Math.max(1, variant.quantity - 1))
                      }
                      className="border p-1 rounded"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={variant.quantity}
                      onChange={(e) =>
                        handleVariantChange(index, "quantity", parseInt(e.target.value) || 1)
                      }
                      className="w-12 border p-2 rounded text-center"
                    />
                    <button
                      onClick={() => handleVariantChange(index, "quantity", variant.quantity + 1)}
                      className="border p-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addVariant}
                className="bg-gray-700 text-white px-4 py-1 rounded text-sm"
              >
                Add variant
              </button>
            </div>

            {/* Category and Subcategory */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border p-2 rounded mb-2"
              >
                <option value="">Select Category</option>
                {category?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <label className="block text-sm font-medium mb-1">Subcategory:</label>
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="w-full border p-2 rounded"
                disabled={!selectedCategory}
              >
                <option value="">Select Subcategory</option>
                {selectedCategory &&
                  category
                    ?.find((cat) => cat._id === selectedCategory)
                    ?.subcategories?.map((sub) => (
                      <option key={sub._id} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
              </select>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description:</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Product description"
                className="w-full border p-2 rounded"
                rows="3"
              />
            </div>

            {/* Image URLs */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Add Image URLs:</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={currentImageUrl}
                  onChange={(e) => setCurrentImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  className="w-full border p-2 rounded"
                />
                <button
                  onClick={handleAddImageUrl}
                  className="bg-gray-700 text-white px-4 py-2 rounded text-sm"
                >
                  Add URL
                </button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <img
                      src={url}
                      alt="preview"
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => (e.target.src = "placeholder.jpg")}
                    />
                    <button
                      onClick={() => handleRemoveImageUrl(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowProductModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Discard
              </button>
              <button
                onClick={handleAddProduct}
                className="bg-yellow-400 px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Listing */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {product && product.length > 0 ? (
          product.map((prod) => {
            const imageUrl = prod.images && prod.images.length > 0 ? prod.images[0] : "placeholder.jpg";
            const price = prod.variants && prod.variants.length > 0 ? prod.variants[0].price : "N/A";

            return (
              <div onClick={()=>navigate(`/${prod._id}`)}
                key={prod._id}
                className="border rounded-lg shadow p-4 bg-white hover:shadow-md transition-all"
              >
                <img
                  src={imageUrl}
                  alt={prod.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h4 className="text-lg font-semibold mb-2">{prod.title}</h4>
                <p className="text-gray-700 font-medium">₹{price}</p>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-full text-gray-500">No products available.</p>
        )}
      </section>
    </main>
  );
};

export default Home;