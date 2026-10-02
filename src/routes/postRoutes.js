const router = require("express").Router();
const {
  getPosts, getPostBySlug, getPostById, createPost, updatePost, deletePost
} = require("../controllers/postController");
const { protect, authorize } = require("../middleware/auth");

router.get("/", getPosts);
router.get("/slug/:slug", getPostBySlug);
router.get("/:id", getPostById);
router.post("/", protect, authorize("admin", "editor", "author"), createPost);
router.patch("/:id", protect, authorize("admin", "editor", "author"), updatePost);
router.delete("/:id", protect, authorize("admin", "editor", "author"), deletePost);

module.exports = router;
