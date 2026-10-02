const router = require("express").Router();
const {
  getCategories, createCategory, updateCategory, deleteCategory
} = require("../controllers/categoryController");
const { protect, authorize } = require("../middleware/auth");

router.get("/", getCategories);
router.post("/", protect, authorize("admin", "editor"), createCategory);
router.patch("/:id", protect, authorize("admin", "editor"), updateCategory);
router.delete("/:id", protect, authorize("admin", "editor"), deleteCategory);

module.exports = router;
