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

// do like propery exist ?
test("like propery exists ", async () => {
  const newBlogData = {
    title: "test",
    author: "waseem",
    url: "pooze",
    likes: 0,
  };

  const response = await api.post("/api/blogs").send(newBlogData);

  // Check if the response is successful (status code 201)
  expect(response.status).toBe(201);

  // Check if the 'likes' property is present in the response
  expect(response.body).toHaveProperty("likes");

  // Check if the 'likes' property defaults to 0
  expect(response.body.likes).toBe(0);
});

test("responds with 400 Bad Request if title is missing", async () => {
  const newBlogData = {
    author: "waseem",
    url: "pooze",
    likes: 0,
  };

  const response = await api.post("/api/blogs").send(newBlogData);

  // Check if the response is 400 Bad Request
  expect(response.status).toBe(400);
});

test("responds with 400 Bad Request if url is missing", async () => {
  const newBlogData = {
    title: "test",
    author: "waseem",
    likes: 0,
  };

  const response = await api.post("/api/blogs").send(newBlogData);

  // Check if the response is 400 Bad Request
  expect(response.status).toBe(400);
});

// deleting a single resource
test("can delete a single resource", async () => {
  let eample_id = "65bd183c5e93f476576fd45c";
  const response = await api.delete(`/api/blogs/${eample_id}`).send();
  expect(response.status).toBe(204);
});

// deleting a single resource
test("can update a single resource", async () => {
  const updatedpost = {
    title: "te2st",
    author: "waseem",
    likes: 12,
  };

  let eample_id = "65bd183c5e93f476576fd45e";
  const response = await api.put(`/api/blogs/${eample_id}`).send(updatedpost);
  expect(response.status).toBe(200);
});

afterAll(async () => {
  await mongoose.connection.close();
});
