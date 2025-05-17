import express from "express"
import { login, userRegister } from "../Controller/userController.js"
import { addCategory, addSubcategory, getAllCategories } from "../Controller/categoryController.js"
import { addProduct, getProducts } from "../Controller/productController.js"
import { protect } from "../middlewares/authentication.js"

const Router=express.Router()

Router.post("/register",userRegister)
Router.post("/login",login)
Router.post("/catagory",protect,addCategory)
Router.get("/getcatagory",getAllCategories)
Router.patch("/subcatagory",addSubcategory)
Router.post("/addproduct",addProduct)
Router.get("/getproducts",getProducts)


export default Router