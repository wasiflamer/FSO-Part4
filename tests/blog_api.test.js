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
  expect(response.body).toHaveLength(2);
});

// unique identifier property of the blog posts is named id
test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  // console.log(response.body[0].title);
  expect(response.body[0].id).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});
