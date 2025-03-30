
const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav));
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  
  const authorCount = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});
  
  const topAuthor = Object.keys(authorCount).reduce((a, b) => (authorCount[a] > authorCount[b] ? a : b));
  return { author: topAuthor, blogs: authorCount[topAuthor] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  
  const likeCount = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});
  
  const topAuthor = Object.keys(likeCount).reduce((a, b) => (likeCount[a] > likeCount[b] ? a : b));
  return { author: topAuthor, likes: likeCount[topAuthor] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
