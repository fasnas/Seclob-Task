import products from '../Models/productSchema.js';
import category from '../Models/catagorySchema.js';

export const addProduct = async (req, res) => {
  try {
    const { title, description, categoryName, subCategory, variants, images } = req.body;

    const foundCategory = await category.findOne({ name: categoryName });

    if (!foundCategory) {
      return res.status(400).json({ error: "Category not found" });
    }

    const subExists = foundCategory.subcategories.some(
      (sub) => sub.name.toLowerCase() === subCategory.toLowerCase()
    );

    if (!subExists) {
      return res.status(400).json({
        error: `Subcategory '${subCategory}' not found under category '${categoryName}'`,
      });
    }

    const newProduct = await products.create({
      title,
      description,
      categoryName: foundCategory._id,
      subCategory,
      variants,
      images,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};


export const getProducts = async (req, res) => {
  try {
    const product= await products.find();
    res.status(200).json({
        product
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
