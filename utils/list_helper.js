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

  return sumOfAll;
};

module.exports = {
  dummy,
  totalLikes,
};
