const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// get all blogs | router
blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
    
  });
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
blogsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((savedBlog) => {
      response.json(savedBlog);
    })
    .catch((error) => next(error));
});

// delete specific blog  | router

blogsRouter.delete("/:id", (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
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
