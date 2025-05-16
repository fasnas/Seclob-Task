// context.js
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../../../axiosINstance";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const[product,Setproduct]=useState()

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/getcatagory");
      setCategory(res.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/getproducts");
      Setproduct(res.data.product);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);



  return (
    <UserContext.Provider value={{ category, setCategory, fetchCategories,product,fetchProducts}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider