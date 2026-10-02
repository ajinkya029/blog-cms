const Category = require("../models/Category");
const slugify = require("slugify");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/apiResponse");

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  sendResponse(res, 200, true, "Categories retrieved", { categories });
});

exports.createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const category = await Category.create({
    name,
    description,
    slug: slugify(name, { lower: true, strict: true })
  });
  sendResponse(res, 201, true, "Category created", { category });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return sendResponse(res, 404, false, "Category not found");

  if (req.body.name) {
    category.name = req.body.name;
    category.slug = slugify(req.body.name, { lower: true, strict: true });
  }
  if (req.body.description !== undefined) category.description = req.body.description;

  await category.save();
  sendResponse(res, 200, true, "Category updated", { category });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return sendResponse(res, 404, false, "Category not found");
  sendResponse(res, 200, true, "Category deleted");
});
