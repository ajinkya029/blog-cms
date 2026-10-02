const Comment = require("../models/Comment");
const Post = require("../models/Post");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/apiResponse");

exports.getPostComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({
    post: req.params.postId,
    status: "approved"
  })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 });

  sendResponse(res, 200, true, "Comments retrieved", { comments });
});

exports.createComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post || post.status !== "published") {
    return sendResponse(res, 404, false, "Published post not found");
  }

  const comment = await Comment.create({
    post: post._id,
    user: req.user._id,
    content: req.body.content
  });

  const populated = await comment.populate("user", "name avatar");
  sendResponse(res, 201, true, "Comment submitted for moderation", { comment: populated });
});

exports.getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find()
    .populate("user", "name email")
    .populate("post", "title slug")
    .sort({ createdAt: -1 });

  sendResponse(res, 200, true, "Comments retrieved", { comments });
});

exports.updateCommentStatus = asyncHandler(async (req, res) => {
  const allowed = ["pending", "approved", "rejected"];
  if (!allowed.includes(req.body.status)) {
    return sendResponse(res, 400, false, "Invalid comment status");
  }

  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  if (!comment) return sendResponse(res, 404, false, "Comment not found");
  sendResponse(res, 200, true, "Comment status updated", { comment });
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  if (!comment) return sendResponse(res, 404, false, "Comment not found");
  sendResponse(res, 200, true, "Comment deleted");
});
