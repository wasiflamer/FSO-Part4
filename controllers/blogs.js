const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

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

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  if (!body.title) {
    response.status(400).json(blog);
  }

  if (!body.url) {
    response.status(400).json(blog);
  }

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

// delete specific blog  | router
blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

// update specific blog | router
blogsRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

// exporting the whole blogsrouter
module.exports = blogsRouter;
