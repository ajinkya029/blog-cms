const Post = require("../models/Post");
const Category = require("../models/Category");
const slugify = require("slugify");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/apiResponse");

const makeUniqueSlug = async (title, currentId = null) => {
  const base = slugify(title, { lower: true, strict: true, trim: true });
  let slug = base || `post-${Date.now()}`;
  let count = 1;

  while (true) {
    const query = { slug };
    if (currentId) query._id = { $ne: currentId };
    const exists = await Post.exists(query);
    if (!exists) return slug;
    slug = `${base}-${count++}`;
  }
};

const canManagePost = (req, post) =>
  ["admin", "editor"].includes(req.user.role) ||
  post.author.toString() === req.user._id.toString();

exports.getPosts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status = "published",
    category,
    author,
    tag,
    featured,
    search
  } = req.query;

  const query = {};
  if (status !== "all") query.status = status;
  if (category) query.category = category;
  if (author) query.author = author;
  if (tag) query.tags = tag;
  if (featured !== undefined) query.featured = featured === "true";
  if (search) query.$text = { $search: search };

  const pageNumber = Math.max(Number(page), 1);
  const limitNumber = Math.min(Math.max(Number(limit), 1), 50);

  const [posts, total] = await Promise.all([
    Post.find(query)
      .populate("author", "name avatar")
      .populate("category", "name slug")
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber),
    Post.countDocuments(query)
  ]);

  sendResponse(res, 200, true, "Posts retrieved", {
    posts,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      pages: Math.ceil(total / limitNumber)
    }
  });
});

exports.getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
    .populate("author", "name avatar bio")
    .populate("category", "name slug");

  if (!post) return sendResponse(res, 404, false, "Post not found");

  if (post.status === "published") {
    post.views += 1;
    await post.save();
  }

  sendResponse(res, 200, true, "Post retrieved", { post });
});

exports.getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("author", "name avatar")
    .populate("category", "name slug");

  if (!post) return sendResponse(res, 404, false, "Post not found");
  sendResponse(res, 200, true, "Post retrieved", { post });
});

exports.createPost = asyncHandler(async (req, res) => {
  const {
    title, excerpt, content, coverImage, status,
    category, tags, featured
  } = req.body;

  if (category && !(await Category.exists({ _id: category }))) {
    return sendResponse(res, 400, false, "Category not found");
  }

  const postStatus = ["draft", "published", "archived"].includes(status) ? status : "draft";
  const post = await Post.create({
    title,
    slug: await makeUniqueSlug(title),
    excerpt,
    content,
    coverImage,
    status: postStatus,
    publishedAt: postStatus === "published" ? new Date() : null,
    author: req.user._id,
    category: category || null,
    tags: Array.isArray(tags) ? tags : [],
    featured: Boolean(featured)
  });

  const populated = await post.populate([
    { path: "author", select: "name avatar" },
    { path: "category", select: "name slug" }
  ]);

  sendResponse(res, 201, true, "Post created", { post: populated });
});

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return sendResponse(res, 404, false, "Post not found");
  if (!canManagePost(req, post)) return sendResponse(res, 403, false, "Not authorized");

  const allowed = ["title", "excerpt", "content", "coverImage", "status", "category", "tags", "featured"];
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) post[field] = req.body[field];
  });

  if (req.body.title && req.body.title !== post.title) {
    post.slug = await makeUniqueSlug(req.body.title, post._id);
  }
  if (post.status === "published" && !post.publishedAt) post.publishedAt = new Date();
  if (post.status !== "published") post.publishedAt = null;

  await post.save();
  sendResponse(res, 200, true, "Post updated", { post });
});

exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return sendResponse(res, 404, false, "Post not found");
  if (!canManagePost(req, post)) return sendResponse(res, 403, false, "Not authorized");

  await post.deleteOne();
  sendResponse(res, 200, true, "Post deleted");
});
