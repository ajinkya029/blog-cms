# 📝 Blog / CMS Backend

![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8.x-880000?style=for-the-badge\&logo=mongoose\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![bcrypt](https://img.shields.io/badge/bcrypt-Password%20Hashing-003A70?style=for-the-badge)
![Helmet](https://img.shields.io/badge/Helmet-Security-000000?style=for-the-badge)
![CORS](https://img.shields.io/badge/CORS-Enabled-4B8BBE?style=for-the-badge)

A secure and scalable **Blog / Content Management System REST API** built with **Node.js, Express.js, MongoDB, and Mongoose**.

The backend provides everything required for a modern blogging platform, including authentication, role-based authorization, blog post management, categories, tags, comments, moderation, user management, search, pagination, and security middleware.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration
* User login/logout
* JWT-based authentication
* HTTP-only cookie support
* Bearer token authentication
* Protected routes
* Role-based access control
* User profile management
* Password hashing with bcrypt

### 👥 User Management

* Admin user management
* User role management
* Activate/deactivate users
* Supported roles:

  * `admin`
  * `editor`
  * `author`
  * `user`

### 📝 Blog Posts

* Create blog posts
* Update posts
* Delete posts
* View posts
* Draft posts
* Published posts
* Archived posts
* Automatic SEO-friendly slugs
* Featured posts
* Cover images
* Tags
* Categories
* Post view counter
* Author information

### 🔎 Search & Filtering

* Full-text search
* Pagination
* Category filtering
* Author filtering
* Tag filtering
* Featured post filtering
* Post status filtering

### 💬 Comments

* Add comments to posts
* View approved comments
* Comment moderation
* Approve comments
* Reject comments
* Delete comments

### 🗂️ Categories

* Create categories
* Update categories
* Delete categories
* Automatic category slugs
* Category descriptions

### 🛡️ Security

* Helmet security headers
* CORS configuration
* Authentication rate limiting
* Password hashing
* HTTP-only authentication cookies
* Environment variables
* Centralized error handling

---

## 🛠️ Tech Stack

| Technology             | Purpose                |
| ---------------------- | ---------------------- |
| **Node.js**            | JavaScript runtime     |
| **Express.js**         | REST API framework     |
| **MongoDB**            | NoSQL database         |
| **Mongoose**           | MongoDB ODM            |
| **JWT**                | Authentication         |
| **bcryptjs**           | Password hashing       |
| **Helmet**             | HTTP security          |
| **CORS**               | Cross-origin requests  |
| **Express Rate Limit** | API rate limiting      |
| **Cookie Parser**      | Cookie handling        |
| **Morgan**             | HTTP request logging   |
| **Slugify**            | SEO-friendly URL slugs |
| **Nodemon**            | Development server     |

---

## 📁 Project Structure

```text
blog-cms/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── commentController.js
│   │   ├── postController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   │
│   ├── models/
│   │   ├── Category.js
│   │   ├── Comment.js
│   │   ├── Post.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── postRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── utils/
│   │   ├── apiResponse.js
│   │   ├── asyncHandler.js
│   │   └── token.js
│   │
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/blog-cms-backend.git
```

```bash
cd blog-cms
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/blog_cms

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173

COOKIE_SECURE=false
```

### Environment Variables

| Variable         | Description                         |
| ---------------- | ----------------------------------- |
| `NODE_ENV`       | Application environment             |
| `PORT`           | Backend server port                 |
| `MONGO_URI`      | MongoDB connection string           |
| `JWT_SECRET`     | Secret used to sign JWTs            |
| `JWT_EXPIRES_IN` | JWT expiration time                 |
| `CLIENT_URL`     | Frontend URL                        |
| `COOKIE_SECURE`  | Enable secure cookies in production |

---

# ▶️ Running the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The API will run at:

```text
http://localhost:5000
```

API base URL:

```text
http://localhost:5000/api
```

---

# ❤️ Health Check

Check whether the API is running:

```http
GET /api/health
```

Example response:

```json
{
  "success": true,
  "message": "Blog CMS API is running",
  "timestamp": "2026-10-02T00:00:00.000Z"
}
```

---

# 🔐 Authentication API

## Register

```http
POST /api/auth/register
```

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "author"
}
```

### Response

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "author"
    },
    "token": "JWT_TOKEN"
  }
}
```

---

## Login

```http
POST /api/auth/login
```

### Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Get Current User

```http
GET /api/auth/me
```

Requires authentication.

---

## Update Profile

```http
PATCH /api/auth/profile
```

Requires authentication.

### Request

```json
{
  "name": "John Updated",
  "bio": "Full-Stack JavaScript Developer",
  "avatar": "https://example.com/avatar.jpg"
}
```

---

## Logout

```http
POST /api/auth/logout
```

---

# 📝 Posts API

## Get Posts

```http
GET /api/posts
```

Supports pagination and filtering.

### Example

```http
GET /api/posts?page=1&limit=10
```

### Search

```http
GET /api/posts?search=javascript
```

### Filter by Category

```http
GET /api/posts?category=CATEGORY_ID
```

### Filter by Tag

```http
GET /api/posts?tag=react
```

### Filter by Status

```http
GET /api/posts?status=published
```

### Featured Posts

```http
GET /api/posts?featured=true
```

---

## Get Post by Slug

```http
GET /api/posts/slug/getting-started-with-react
```

---

## Get Post by ID

```http
GET /api/posts/:id
```

---

## Create Post

```http
POST /api/posts
```

Requires:

* `author`
* `editor`
* `admin`

### Request

```json
{
  "title": "Getting Started with React",
  "excerpt": "A beginner-friendly React introduction.",
  "content": "Your complete article content goes here.",
  "coverImage": "https://example.com/react.jpg",
  "status": "published",
  "category": "CATEGORY_ID",
  "tags": [
    "react",
    "javascript",
    "frontend"
  ],
  "featured": true
}
```

---

## Update Post

```http
PATCH /api/posts/:id
```

The post owner, editor, or admin can update the post.

---

## Delete Post

```http
DELETE /api/posts/:id
```

The post owner, editor, or admin can delete the post.

---

# 🗂️ Categories API

## Get Categories

```http
GET /api/categories
```

## Create Category

```http
POST /api/categories
```

Requires `editor` or `admin`.

### Request

```json
{
  "name": "JavaScript",
  "description": "Articles about JavaScript development."
}
```

## Update Category

```http
PATCH /api/categories/:id
```

## Delete Category

```http
DELETE /api/categories/:id
```

---

# 💬 Comments API

## Get Post Comments

```http
GET /api/comments/post/:postId
```

Only approved comments are returned.

## Create Comment

```http
POST /api/comments/post/:postId
```

Requires authentication.

### Request

```json
{
  "content": "Great article! This was very helpful."
}
```

New comments are initially created with:

```text
pending
```

status.

---

## Get All Comments

```http
GET /api/comments
```

Requires `editor` or `admin`.

---

## Moderate Comment

```http
PATCH /api/comments/:id/status
```

### Approve

```json
{
  "status": "approved"
}
```

### Reject

```json
{
  "status": "rejected"
}
```

---

## Delete Comment

```http
DELETE /api/comments/:id
```

Requires `editor` or `admin`.

---

# 👥 User Management API

User management is restricted to administrators.

## Get Users

```http
GET /api/users
```

## Change User Role

```http
PATCH /api/users/:id/role
```

### Request

```json
{
  "role": "editor"
}
```

Available roles:

```text
admin
editor
author
user
```

## Activate / Deactivate User

```http
PATCH /api/users/:id/status
```

---

# 👮 Role-Based Access Control

| Feature              | User | Author | Editor | Admin |
| -------------------- | :--: | :----: | :----: | :---: |
| View published posts |   ✅  |    ✅   |    ✅   |   ✅   |
| Comment              |   ✅  |    ✅   |    ✅   |   ✅   |
| Create posts         |   ❌  |    ✅   |    ✅   |   ✅   |
| Manage own posts     |   ❌  |    ✅   |    ✅   |   ✅   |
| Manage categories    |   ❌  |    ❌   |    ✅   |   ✅   |
| Moderate comments    |   ❌  |    ❌   |    ✅   |   ✅   |
| Manage users         |   ❌  |    ❌   |    ❌   |   ✅   |

---

# 🔑 Authentication

The API supports two authentication methods.

### Bearer Token

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### HTTP-Only Cookie

The server also sets an HTTP-only:

```text
token
```

cookie after successful authentication.

For frontend applications using cookies, make sure credentials are enabled.

Example with Axios:

```javascript
axios.defaults.withCredentials = true;
```

---

# 🔍 Post Search

The backend uses MongoDB text indexes for searching posts.

Example:

```http
GET /api/posts?search=nodejs
```

The search checks:

* Title
* Content
* Excerpt

---

# 📄 Pagination

Posts support pagination through:

```text
page
limit
```

Example:

```http
GET /api/posts?page=2&limit=10
```

Example response:

```json
{
  "success": true,
  "message": "Posts retrieved",
  "data": {
    "posts": [],
    "pagination": {
      "page": 2,
      "limit": 10,
      "total": 35,
      "pages": 4
    }
  }
}
```

---

# 🛡️ Security

The backend includes several security mechanisms:

* JWT authentication
* HTTP-only cookies
* Password hashing with bcrypt
* Helmet
* CORS
* Authentication rate limiting
* Role-based authorization
* Environment-based secrets
* Centralized error handling
* MongoDB validation
* Request body size limits

### Production Recommendations

For production deployments:

1. Use a strong random `JWT_SECRET`.
2. Use HTTPS.
3. Set:

```env
COOKIE_SECURE=true
```

4. Restrict `CLIENT_URL` to your actual frontend domain.
5. Never commit `.env`.
6. Add refresh-token rotation for long-lived sessions.
7. Add email verification and password reset functionality.

---

# 📊 Database Models

## User

```text
User
├── name
├── email
├── password
├── role
├── avatar
├── bio
├── isActive
└── timestamps
```

## Post

```text
Post
├── title
├── slug
├── excerpt
├── content
├── coverImage
├── status
├── publishedAt
├── author
├── category
├── tags
├── views
├── featured
└── timestamps
```

## Category

```text
Category
├── name
├── slug
├── description
└── timestamps
```

## Comment

```text
Comment
├── post
├── user
├── content
├── status
└── timestamps
```

---

# 🔗 Entity Relationships

```text
User
 │
 ├───────────────┐
 │               │
 ▼               ▼
Post           Comment
 │               │
 │               │
 ▼               ▼
Category       User
```

A user can create multiple posts.

A post belongs to an author and optionally a category.

A post can have multiple comments.

A comment belongs to both a post and a user.

---

# 🚀 Future Enhancements

The following features can be added as the project grows:

- Refresh token authentication
- Forgot password
- Password reset
- Email verification
- Cloudinary image uploads
- AWS S3 image storage
- Rich-text editor integration
- Post revisions
- Scheduled publishing
- SEO metadata
- Social sharing metadata
- Analytics dashboard
- Soft delete / recycle bin
- Newsletter subscriptions
- Swagger/OpenAPI documentation
- Jest unit tests
- Supertest API tests
- Docker support
- CI/CD pipeline

---

# 🧪 Development

Run the development server with Nodemon:

```bash
npm run dev
```

Run the production server:

```bash
npm start
```

---

# 📌 API Base URL

Development:

```text
http://localhost:5000/api
```

Production:

```text
https://your-api-domain.com/api
```

---

# 📄 License

This project is available for learning, development, and portfolio purposes.

---

## 👨‍💻 Author

**Ajinkya Dhatrak**

Github : ```https://github.com/ajinkya029```

---

⭐ If you found this project useful, consider giving the repository a star!
