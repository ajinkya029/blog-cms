const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/apiResponse");

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 });

  sendResponse(res, 200, true, "Users retrieved", { users });
});

exports.updateUserRole = asyncHandler(async (req, res) => {
  const roles = ["admin", "author", "editor", "user"];
  if (!roles.includes(req.body.role)) {
    return sendResponse(res, 400, false, "Invalid role");
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new: true }
  ).select("-password");

  if (!user) return sendResponse(res, 404, false, "User not found");
  sendResponse(res, 200, true, "User role updated", { user });
});

exports.toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return sendResponse(res, 404, false, "User not found");

  user.isActive = !user.isActive;
  await user.save();

  sendResponse(res, 200, true, "User status updated", {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    }
  });
});
