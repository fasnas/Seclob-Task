import React from 'react';
import { UserContext } from '../context/context';
import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetailes = () => {
  const { product, category } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the product by ID
  const selectedProduct = product?.find((prod) => prod._id === id);

  if (!selectedProduct) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-700">Product Not Found</h1>
        <p className="text-gray-500 mt-2">The product with ID {id} does not exist.</p>
      </div>
    );
  }

  const { title, description, categoryName, subCategory, variants, images } = selectedProduct;

  const categoryObj = category?.find((cat) => cat._id === categoryName);
  const categoryNameDisplay = categoryObj ? categoryObj.name : categoryName;

  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-all"
        >
          Back
        </button>
      </div>

      {/* Main Product Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          {images && images.length > 0 ? (
            <>
              <img
                src={images[0]}
                alt={`${title} main image`}
                className="w-full h-96 object-cover rounded-lg shadow-md"
                onError={(e) => (e.target.src = "placeholder.jpg")}
              />
              <div className="flex gap-2 flex-wrap">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${title} thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm cursor-pointer hover:opacity-80"
                    onError={(e) => (e.target.src = "placeholder.jpg")}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500">No images available.</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <div>
            <p className="text-gray-600">
              <span className="font-medium">Category:</span> {categoryNameDisplay}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Subcategory:</span> {subCategory}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
            <p className="text-gray-600">{description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Variants</h2>
            {variants && variants.length > 0 ? (
              <div className="space-y-3">
                {variants.map((variant, index) => (
                  <div
                    key={variant._id || index}
                    className="border rounded-lg p-3 shadow-sm bg-white"
                  >
                    <p className="text-gray-600">
                      <span className="font-medium">RAM:</span> {variant.ram}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Price:</span> ₹{variant.price}
                    </p>
                    <p className ="text-gray-600">
                      <span className="font-medium">Quantity:</span> {variant.quantity}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No variants available.</p>
            )}
          </div>

          <div className="text-sm text-gray-500 mt-4 flex">
            <button className='h-10 w-30  bg-[#EDA415] rounded-2xl font-bold'>Add To Cart</button>
            <button className='h-10 w-30 ml-4  bg-[#EDA415] rounded-2xl font-bold'> Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailes;