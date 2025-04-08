const Blog = require('../models/blog');

const initBlogs = [
  {
    _id: '1',
    title: 'First Blog',
    author: 'Alice',
    url: 'http://example.com/1',
    likes: 5,
    __v: 0,
  },
  {
    _id: '2',
    title: 'Second Blog',
    author: 'Bob',
    url: 'http://example.com/2',
    likes: 10,
    __v: 0,
  },
  {
    _id: '3',
    title: 'Third Blog',
    author: 'Alice',
    url: 'http://example.com/3',
    likes: 3,
    __v: 0,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
}

module.exports = {
    initBlogs,
    nonExistingId,
    blogsInDb,
    };