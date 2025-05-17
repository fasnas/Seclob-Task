import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import Router from "./Routes/allInOneRoute.js"
import dbConnect from "./config/dbConnect.js"

const app=express()

dotenv.config();
dbConnect()
app.use(morgan('dev'));
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,              
}));
  app.use("/api",Router)

app.listen(port, () => {
  console.log(`server running on localhost ${port}`);
});