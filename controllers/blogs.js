const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

// get all blogs | router
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// get specifc blogs | router
blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((Blog) => {
      if (Blog) {
        response.json(Blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// save blog | router
blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  if (!body.title) {
    response.status(400).json(blog);
  }

  if (!body.url) {
    response.status(400).json(blog);
  }

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

// delete specific blog  | router
blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

// update specific blog | router
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.json(updatedBlog);
});

// exporting the whole blogsrouter
module.exports = blogsRouter;
