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

module.exports = {
  dummy,
  totalLikes,
};

// most liked blog
const favoriteBlog = (blogs) => {
  // find the largest
  let maxNumber = -Infinity;

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxNumber) {
      indeOFHighest = i;
    }
  }

  return indeOFHighest;
};
