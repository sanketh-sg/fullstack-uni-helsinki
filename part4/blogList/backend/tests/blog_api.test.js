// tests/list_helper.test.js
const { test, describe, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const listHelper = require('../utils/list_helper');
const blogsHelper = require('./blogs_helper');


const blogs = blogsHelper.initBlogs;



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

test('GET /api/blogs returns blogs as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('unique identifier is id', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach((blog) => assert.ok(blog.id));
});

test('POST /api/blogs creates a new blog', async () => {
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

test('POST /api/blogs without likes defaults to 0', async () => {
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

test("POST /api/blogs without title and url returns 400", async () => {
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

test.only('DELETE /api/blogs/:id removes a blog', async () => {
  const blogsAtStart = await blogsHelper.blogsInDb();
  // console.log('blogsAtStart', blogsAtStart.length)
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await blogsHelper.blogsInDb();
  // console.log('blogsAtEnd', blogsAtEnd.length)
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

});

test.only('PUT /api/blogs/:id updates a blog', async () => {
  const blogsAtStart = await blogsHelper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };


  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await blogsHelper.blogsInDb();
  const updatedBlogFromDb = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);
  assert.strictEqual(updatedBlogFromDb.likes, updatedBlog.likes);
});



after(async () => {
  await mongoose.connection.close();
})
