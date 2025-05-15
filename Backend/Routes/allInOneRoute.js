import express from "express"
import { login, userRegister } from "../Controller/userController.js"
import { addCategory, addSubcategory, getAllCategories } from "../Controller/categoryController.js"

const Router=express.Router()

Router.post("/register",userRegister)
Router.post("/login",login)
Router.post("/catagory",addCategory)
Router.get("/getcatagory",getAllCategories)
Router.patch("/subcatagory",addSubcategory)


export default Router