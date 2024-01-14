const listHelper = require("../utils/list_helper");

describe("total likes", () => {
  const emptylist = [];

  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f1",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f2",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 2,
    },
    {
      _id: "5a422aa71b54a676234d17f3",
      title: "oop is harmfull ",
      author: "Edsger W.",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To.html",
      likes: 20,
      __v: 3,
    },
  ];

  test("when list is empty ", () => {
    const result = listHelper.totalLikes(emptylist);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has multiple blogs", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(35);
  });
});
