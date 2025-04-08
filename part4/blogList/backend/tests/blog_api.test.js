// tests/list_helper.test.js
const { beforeEach, test, describe, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const listHelper = require('../utils/list_helper');
const Blog = require('../models/blog');
const blogsHelper = require('./blogs_helper');
const { title } = require('node:process');



test('dummy returns one', () => {
  assert.strictEqual(listHelper.dummy([]), 1);
});

describe('total likes', () => {
  test('sum of likes in a list', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 18);
  });

  test('empty list returns 0', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });
});

describe('favorite blog', () => {
  test('blog with most likes', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[1]);
  });

  test('empty list returns null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null);
  });
});

describe('most blogs', () => {
  test('author with most blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), { author: 'Alice', blogs: 2 });
  });

  test('empty list returns null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null);
  });
});

describe('most likes', () => {
  test('author with most likes', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), { author: 'Bob', likes: 10 });
  });

  test('empty list returns null', () => {
    assert.strictEqual(listHelper.mostLikes([]), null);
  });
});

test.only('GET /api/blogs returns blogs as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test.only('unique identifier is id', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach((blog) => assert.ok(blog.id));
});

test.only('POST /api/blogs creates a new blog', async () => {
  const blogsAtStart = await blogsHelper.blogsInDb();
  const newBlog = {
    title: 'test Blog',
    author: 'test Author',
    url: 'http://test.com',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsHelper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    assert.ok(titles.includes(newBlog.title));
    
});

test.only('POST /api/blogs without likes defaults to 0', async () => {
  const newBlog = {
    title: 'test Blog without likes',
    author: 'test Author',
    url: 'http://test.com',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await blogsHelper.blogsInDb();
  const createdBlog = blogsAtEnd.find((blog) => blog.title === newBlog.title);
  assert.strictEqual(createdBlog.likes, 0);
});

test.only("POST /api/blogs without title and url returns 400", async () => {
  const newBlog = {
    title: "",
    author: "test Author",
    url: "",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400);
});


after(async () => {
  await mongoose.connection.close();
})
