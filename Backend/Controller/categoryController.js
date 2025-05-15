import mongoose from "mongoose";
import category from "../Models/catagorySchema.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Add Category
export const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  const existing = await category.findOne({ name: name.trim() });
  if (existing) {
    return res.status(400).json({ message: "Category already exists" });
  }

  const newCategory = new category({ name: name.trim(), subcategories: [] });
  const saved = await newCategory.save();

  res.status(201).json({
    message: "Category created successfully",
    category: saved,
  });
});

// Add Subcategory
// @route POST /api/categories/subcategory
export const addSubcategory = asyncHandler(async (req, res) => {
  const { categoryName, name } = req.body;

  if (!categoryName) {
    return res.status(400).json({ message: "Category name is required in body" });
  }

  if (!name) {
    return res.status(400).json({ message: "Subcategory name is required" });
  }

  const foundCategory = await category.findOne({ name: categoryName.trim() });
  if (!foundCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  const subcategoryExists = foundCategory.subcategories.some(
    (sub) => sub.name.toLowerCase() === name.trim().toLowerCase()
  );

  if (subcategoryExists) {
    return res.status(400).json({ message: "Subcategory already exists in this category" });
  }

  foundCategory.subcategories.push({ name: name.trim() });
  const updatedCategory = await foundCategory.save();

  res.status(200).json({
    message: "Subcategory added successfully",
    category: updatedCategory,
  });
});


export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await category.find();

  res.status(200).json({
    message: "Categories fetched successfully",
    categories,
  });
});