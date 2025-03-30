// tests/list_helper.test.js
const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const blogs = [
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
