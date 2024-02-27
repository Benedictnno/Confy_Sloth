const User = require("../models/User");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils/jwt");
const { StatusCodes } = require("http-status-codes");
const createTokenUser = require("../utils/createTokenUser");
const crypto = require("crypto");
const Token = require("../models/Token");
const sendVerification= require("../utils/sendVerification")

const register = async (req, res) => {
   const { email, password, name, location } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  // const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    name,
    email,
    password,
    // verificationToken,
    role,
    location
  });

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, tokenUser });
  
  // await sendVerification({
  //   email: user.email,
  //   name: user.name,
  //   verificationToken: user.verificationToken,
  //   origin: "http://localhost:3000",
  // });
  // res
  //   .status(StatusCodes.CREATED)
  //   .json({ msg: `verify token`, verification: user.verificationToken });
   res.status(StatusCodes.CREATED).json({user: tokenUser });
};


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
 
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, tokenUser });

  res.status(StatusCodes.OK).json({ tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logOut", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

module.exports = { register, login, logout };
