const router = require("express").Router();
const { register, login, logout, me, updateProfile } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/me", protect, me);
router.patch("/profile", protect, updateProfile);

module.exports = router;
