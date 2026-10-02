const router = require("express").Router();
const {
  getPostComments, createComment, getAllComments, updateCommentStatus, deleteComment
} = require("../controllers/commentController");
const { protect, authorize } = require("../middleware/auth");

router.get("/post/:postId", getPostComments);
router.post("/post/:postId", protect, createComment);
router.get("/", protect, authorize("admin", "editor"), getAllComments);
router.patch("/:id/status", protect, authorize("admin", "editor"), updateCommentStatus);
router.delete("/:id", protect, authorize("admin", "editor"), deleteComment);

module.exports = router;
