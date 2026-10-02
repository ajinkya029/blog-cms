const router = require("express").Router();
const {
  getUsers, updateUserRole, toggleUserStatus
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect, authorize("admin"));
router.get("/", getUsers);
router.patch("/:id/role", updateUserRole);
router.patch("/:id/status", toggleUserStatus);

module.exports = router;
