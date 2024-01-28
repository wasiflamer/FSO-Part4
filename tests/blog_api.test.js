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

test("correctly identifies number of blog posts", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(2);
});

afterAll(async () => {
  await mongoose.connection.close();
});
