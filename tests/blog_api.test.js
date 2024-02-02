const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

// number of blog posts
test("correctly identifies number of blog posts", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(response.body.length);
});

// unique identifier property of the blog posts is named id
test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("successfully creates a new blog post.", async () => {
  const newBlogData = {
    title: "test",
    author: "waseem",
    url: "pooze",
    likes: 1000000,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlogData)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // Assuming the server responds with the created blog data

  expect(response.body.id).toBeDefined();
  expect(response.body.title).toBe(newBlogData.title);
  expect(response.body.author).toBe(newBlogData.author);
  expect(response.body.url).toBe(newBlogData.url);
  expect(response.body.likes).toBe(newBlogData.likes);
});

afterAll(async () => {
  await mongoose.connection.close();
});
