import express from "express"
import { login, userRegister } from "../Controller/userController.js"

const Router=express.Router()

Router.post("/register",userRegister)
Router.post("/login",login)

export default Router