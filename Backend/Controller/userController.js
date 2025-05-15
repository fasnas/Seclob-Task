import mongoose from "mongoose";
import users from "../Models/UserSchema.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { comparePassword,hashPassword } from "../utils/bcrypt.js";
import { generateAccesToken,verifyToken } from "../utils/jwt.js";


export const userRegister = asyncHandler(async (req, res) => {
  const { name,email,password } = req.body;

  const existUser = await users.findOne({ email });
  if (existUser) {
    return res.status(400).json({
      success: false,
      message: "email already exist. Please use another email",
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new users({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "Registered successfully",
  });
});


export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await users.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('Invalid email or password');
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid email or password');
  }

  const token = generateAccesToken(user)

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    }
  });
});

