const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/token");
const sendResponse = require("../utils/apiResponse");

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.COOKIE_SECURE === "true",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  bio: user.bio,
  createdAt: user.createdAt
});

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return sendResponse(res, 409, false, "Email is already registered");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role && ["author", "editor", "user"].includes(role) ? role : "author"
  });

  const token = generateToken(user._id);
  res.cookie("token", token, cookieOptions());

  sendResponse(res, 201, true, "Registration successful", {
    user: sanitizeUser(user),
    token
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return sendResponse(res, 401, false, "Invalid email or password");
  }

  if (!user.isActive) {
    return sendResponse(res, 403, false, "Account is inactive");
  }

  const token = generateToken(user._id);
  res.cookie("token", token, cookieOptions());

  sendResponse(res, 200, true, "Login successful", {
    user: sanitizeUser(user),
    token
  });
});

exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", cookieOptions());
  sendResponse(res, 200, true, "Logout successful");
});

exports.me = asyncHandler(async (req, res) => {
  sendResponse(res, 200, true, "Current user", { user: sanitizeUser(req.user) });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const allowed = ["name", "avatar", "bio"];
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) req.user[field] = req.body[field];
  });

  await req.user.save();
  sendResponse(res, 200, true, "Profile updated", { user: sanitizeUser(req.user) });
});
