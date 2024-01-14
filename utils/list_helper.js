const dummy = (blogs) => {
  return 1;
};

// return the total likes in all blogs
const totalLikes = (blogs) => {
  let sumOfAll = 0;

  // Perform some operations on the array
  for (let i = 0; i < blogs.length; i++) {
    sumOfAll += blogs[i].likes;
  }

  return blogs.length == 0 ? 0 : sumOfAll;
};

// most liked blog
const favoriteBlog = (blogs) => {
  let maxLikes = -Infinity;
  let indexOfHighest = -1;

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxLikes) {
      maxLikes = blogs[i].likes;
      indexOfHighest = i;
    }
  }

  // Omitting _id, __v, and url from the result
  const { _id, __v, url, ...result } = blogs[indexOfHighest];
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
